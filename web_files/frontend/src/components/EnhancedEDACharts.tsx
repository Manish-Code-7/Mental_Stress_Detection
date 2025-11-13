"use client";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { Alert, AlertDescription } from "@/components/ui/alert";

const STRESS_COLORS = {
  high_stress: "#FF6B6B",
  low_stress: "#4ECDC4",
  neutral: "#95E1D3",
  positive: "#38B6A8",
};

const COLORS = ["#FF6B6B", "#4ECDC4", "#95E1D3", "#38B6A8", "#F59E0B", "#7C3AED"];

interface EDAData {
  basic_stats?: {
    shape?: [number, number];
    memory_mb?: number;
    duplicates?: number;
    missing_total?: number;
  };
  text_stats?: Record<string, {
    avg_length?: number;
    median_length?: number;
    avg_words?: number;
    median_words?: number;
    avg_sentences?: number;
  }>;
  label_distribution?: Record<string, number>;
  class_distribution?: Record<string, number>;
  high_correlations?: Array<{
    feature1: string;
    feature2: string;
    correlation: number;
  }>;
  insights?: Array<{
    type: string;
    message: string;
  }>;
  word_frequencies?: Array<[string, number]>;
  text_length_distribution?: Array<{ bucket: string; count: number }>;
  subreddit_stats?: {
    top_subreddits?: Record<string, number>;
    total_unique?: number;
    subreddit_label_cross?: {
      subreddits: string[];
      labels: string[];
      values: number[][];
    };
    stress_rates?: Record<string, {
      stress_count: number;
      total: number;
      stress_rate: number;
    }>;
  };
}

export function EnhancedEDACharts() {
  const [data, setData] = useState<EDAData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/eda");
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to fetch EDA data");
        setData(json);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Failed to fetch EDA data");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!data) {
    return <div className="text-sm text-stone-600">No EDA data available</div>;
  }

  // Process label distribution
  const labelDist = data.label_distribution || data.class_distribution || {};
  const pieData = Object.keys(labelDist).map((k) => ({
    name: k,
    value: labelDist[k],
  }));

  // Process word frequencies
  const wordFreq = data.word_frequencies || [];
  const wordFreqData = Array.isArray(wordFreq)
    ? wordFreq.slice(0, 20).map((d: [string, number] | { word?: string; name?: string; count?: number; value?: number }) => ({
        word: Array.isArray(d) ? d[0] : (d.word || d.name || ""),
        count: Array.isArray(d) ? d[1] : (d.count || d.value || 0),
      }))
    : [];

  // Process text length distribution
  const lengthDist = data.text_length_distribution || [];
  const lengthData = Array.isArray(lengthDist)
    ? lengthDist.map((d: { bucket?: string; name?: string; count?: number; value?: number } | [string, number] | string) => ({
        bucket: typeof d === "object" && !Array.isArray(d) ? (d.bucket || d.name || "") : Array.isArray(d) ? d[0] : String(d),
        count: typeof d === "object" && !Array.isArray(d) ? (d.count || d.value || 0) : Array.isArray(d) ? d[1] : 0,
      }))
    : [];

  // Text statistics by label
  const textStats = data.text_stats || {};
  const textCols = Object.keys(textStats);

  return (
    <div className="space-y-8">
      <Tabs defaultValue="distributions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="distributions">Distributions</TabsTrigger>
          <TabsTrigger value="text-analysis">Text Analysis</TabsTrigger>
          <TabsTrigger value="correlations">Correlations</TabsTrigger>
          <TabsTrigger value="subreddit">Subreddit</TabsTrigger>
        </TabsList>

        {/* Label Distributions */}
        <TabsContent value="distributions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Label Distribution - Pie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      >
                        {pieData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Label Distribution - Bar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pieData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill={STRESS_COLORS.high_stress} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Horizontal Bar */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Class Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pieData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip />
                      <Bar dataKey="value" fill={STRESS_COLORS.low_stress} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Text Analysis */}
        <TabsContent value="text-analysis" className="space-y-6">
          {/* Word Frequency */}
          {wordFreqData.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top 20 Word Frequencies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={wordFreqData.slice(0, 20)} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="word" type="category" width={120} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#7C3AED" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top 20 Word Frequencies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center py-8">
                  Word frequency data is being generated. Please refresh in a moment.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Text Length Distribution */}
          {lengthData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Text Length Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={lengthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="bucket" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="count"
                        stroke="#F59E0B"
                        fill="#F59E0B"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Text Statistics by Label */}
          {textCols.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Text Statistics by Label</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {textCols.slice(0, 3).map((col) => {
                    const stats = textStats[col];
                    if (!stats) return null;

                    const statsData = [
                      { metric: "Avg Length", value: stats.avg_length || 0 },
                      { metric: "Avg Words", value: stats.avg_words || 0 },
                      { metric: "Avg Sentences", value: stats.avg_sentences || 0 },
                    ].filter((d) => d.value > 0);

                    return (
                      <div key={col} className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={statsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="metric" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill={STRESS_COLORS.neutral} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Correlations */}
        <TabsContent value="correlations" className="space-y-6">
          {data.high_correlations && data.high_correlations.length > 0 ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">High Correlations (|r| &gt; 0.5)</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Showing top {Math.min(20, data.high_correlations.length)} feature pairs with strong correlations
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {data.high_correlations.map((corr, idx) => {
                      const absCorr = Math.abs(corr.correlation);
                      const strength = absCorr > 0.8 ? "Very Strong" : absCorr > 0.6 ? "Strong" : "Moderate";
                      const color = absCorr > 0.8 ? "text-red-600" : absCorr > 0.6 ? "text-orange-600" : "text-yellow-600";
                      
                      return (
                        <div
                          key={idx}
                          className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">
                              {corr.feature1} ↔ {corr.feature2}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{strength} correlation</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  absCorr > 0.8 ? "bg-red-500" : absCorr > 0.6 ? "bg-orange-500" : "bg-yellow-500"
                                }`}
                                style={{ width: `${absCorr * 100}%` }}
                              />
                            </div>
                            <span className={`font-bold text-lg ${color} min-w-[60px] text-right`}>
                              {corr.correlation > 0 ? "+" : ""}{corr.correlation.toFixed(3)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
              
              {/* Correlation Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Correlation Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-red-50 rounded-lg">
                      <div className="text-sm text-gray-600">Very Strong (|r| &gt; 0.8)</div>
                      <div className="text-2xl font-bold text-red-600">
                        {data.high_correlations.filter(c => Math.abs(c.correlation) > 0.8).length}
                      </div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="text-sm text-gray-600">Strong (0.6 &lt; |r| ≤ 0.8)</div>
                      <div className="text-2xl font-bold text-orange-600">
                        {data.high_correlations.filter(c => Math.abs(c.correlation) > 0.6 && Math.abs(c.correlation) <= 0.8).length}
                      </div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="text-sm text-gray-600">Moderate (0.5 &lt; |r| ≤ 0.6)</div>
                      <div className="text-2xl font-bold text-yellow-600">
                        {data.high_correlations.filter(c => Math.abs(c.correlation) > 0.5 && Math.abs(c.correlation) <= 0.6).length}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Correlation Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">No high correlations found (|r| &gt; 0.5)</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Subreddit Analysis */}
        <TabsContent value="subreddit" className="space-y-6">
          {data.subreddit_stats && data.subreddit_stats.top_subreddits ? (
            <>
              {/* Top Subreddits Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top Subreddits by Post Count</CardTitle>
                  {data.subreddit_stats.total_unique && (
                    <p className="text-sm text-gray-500 mt-1">
                      Total unique subreddits: {data.subreddit_stats.total_unique}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={Object.entries(data.subreddit_stats.top_subreddits)
                          .map(([name, value]) => ({ name, value }))
                          .slice(0, 15)}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={150} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#7C3AED" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Stress Rates by Subreddit */}
              {data.subreddit_stats.stress_rates && Object.keys(data.subreddit_stats.stress_rates).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Stress Rate by Subreddit</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      Percentage of stress-labeled posts per subreddit
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={Object.entries(data.subreddit_stats.stress_rates)
                            .map(([name, stats]) => ({
                              name,
                              rate: stats.stress_rate * 100,
                              count: stats.stress_count,
                              total: stats.total,
                            }))
                            .sort((a, b) => b.rate - a.rate)}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                          <YAxis label={{ value: "Stress Rate (%)", angle: -90, position: "insideLeft" }} />
                          <Tooltip
                            formatter={(value: number | string, name: string) => {
                              if (name === "rate") return [`${Number(value).toFixed(1)}%`, "Stress Rate"];
                              return [value, name];
                            }}
                            labelFormatter={(label: string) => `Subreddit: ${label}`}
                          />
                          <Bar dataKey="rate" fill="#FF6B6B">
                            {Object.entries(data.subreddit_stats.stress_rates).map((_, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={index % 2 === 0 ? "#FF6B6B" : "#FF8787"}
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Subreddit vs Label Cross-tabulation */}
              {data.subreddit_stats &&
                data.subreddit_stats.subreddit_label_cross &&
                data.subreddit_stats.subreddit_label_cross.values &&
                data.subreddit_stats.subreddit_label_cross.values.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Subreddit vs Label Distribution</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        Post count by subreddit and label
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border p-2 text-left">Subreddit</th>
                              {data.subreddit_stats?.subreddit_label_cross?.labels.map((label, idx) => (
                                <th key={idx} className="border p-2 text-center">
                                  {label}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {data.subreddit_stats?.subreddit_label_cross?.subreddits.map((subreddit, rowIdx) => (
                              <tr key={rowIdx} className="hover:bg-gray-50">
                                <td className="border p-2 font-medium">{subreddit}</td>
                                {data.subreddit_stats?.subreddit_label_cross?.values[rowIdx]?.map(
                                  (value, colIdx) => (
                                    <td key={colIdx} className="border p-2 text-center">
                                      {value}
                                    </td>
                                  )
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                )}
            </>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Subreddit Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">No subreddit data available in the dataset</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}



