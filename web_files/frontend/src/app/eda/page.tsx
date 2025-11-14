"use client";
import { useState, useEffect } from "react";
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BarChart3, TrendingUp, Database, FileText, Activity } from "lucide-react";

interface EDAData {
  basic_stats?: {
    shape: number[];
    memory_mb: number;
    duplicates: number;
    missing_total: number;
  };
  label_distribution?: Record<string, number>;
  text_stats?: {
    text: {
      avg_length: number;
      median_length: number;
      std_length: number;
      max_length: number;
      min_length: number;
      avg_words: number;
      median_words: number;
      avg_sentences: number;
    };
  };
  high_correlations?: Array<{
    feature1: string;
    feature2: string;
    correlation: number;
  }>;
  insights?: Array<{
    type: string;
    message: string;
  }>;
}

export default function EDAPage() {
  const [edaData, setEdaData] = useState<EDAData | null>(null);
  const [figures, setFigures] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Fetch EDA data
        const edaRes = await fetch("/api/eda");
        if (edaRes.ok) {
          const data = await edaRes.json();
          setEdaData(data);
        }

        // Fetch available figures
        const figRes = await fetch("/api/figures");
        if (figRes.ok) {
          const figData = await figRes.json();
          setFigures(figData.figures || []);
        }
      } catch (e) {
        setError("Failed to load EDA data");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const formatNumber = (num: number) => num.toLocaleString();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Data Insights & Analysis
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Comprehensive analysis of the wellness detection dataset
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!loading && edaData && (
          <>
            {/* Dataset Overview */}
            {edaData.basic_stats && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Dataset Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600">Total Samples</div>
                      <div className="text-2xl font-bold text-blue-600">
                        {formatNumber(edaData.basic_stats.shape[0])}
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600">Features</div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatNumber(edaData.basic_stats.shape[1])}
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600">Memory</div>
                      <div className="text-2xl font-bold text-purple-600">
                        {edaData.basic_stats.memory_mb.toFixed(2)} MB
                      </div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600">Duplicates</div>
                      <div className="text-2xl font-bold text-orange-600">
                        {edaData.basic_stats.duplicates}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Label Distribution */}
            {edaData.label_distribution && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Class Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(edaData.label_distribution).map(([label, count]) => {
                      const total = Object.values(edaData.label_distribution!).reduce((a, b) => a + b, 0);
                      const percentage = ((count / total) * 100).toFixed(1);
                      return (
                        <div key={label} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {label === "1" ? "Stress Indicators" : "No Stress Indicators"}
                            </span>
                            <span className="text-sm text-gray-600">
                              {formatNumber(count)} ({percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full ${
                                label === "1" ? "bg-red-500" : "bg-green-500"
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Text Statistics */}
            {edaData.text_stats?.text && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Text Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-600">Avg Length</div>
                      <div className="text-lg font-bold">
                        {Math.round(edaData.text_stats.text.avg_length)} chars
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-600">Avg Words</div>
                      <div className="text-lg font-bold">
                        {Math.round(edaData.text_stats.text.avg_words)} words
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-600">Avg Sentences</div>
                      <div className="text-lg font-bold">
                        {edaData.text_stats.text.avg_sentences.toFixed(1)}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-600">Max Length</div>
                      <div className="text-lg font-bold">
                        {formatNumber(edaData.text_stats.text.max_length)} chars
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Key Correlations */}
            {edaData.high_correlations && edaData.high_correlations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Top Feature Correlations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {edaData.high_correlations.slice(0, 8).map((corr, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="text-sm font-medium">{corr.feature1}</div>
                          <div className="text-xs text-gray-500">↔ {corr.feature2}</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${corr.correlation > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {(corr.correlation * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Insights */}
            {edaData.insights && edaData.insights.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Key Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {edaData.insights.map((insight, idx) => (
                      <Alert key={idx} variant={insight.type === "warning" ? "destructive" : "default"}>
                        <AlertDescription>{insight.message}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Visualizations */}
            {figures.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Data Visualizations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {figures.map((fig) => (
                      <div key={fig} className="border rounded-lg p-4 bg-white">
                        <img
                          src={`/api/figures/${fig}`}
                          alt={fig.replace(/_/g, " ").replace(".png", "")}
                          className="w-full h-auto rounded"
                        />
                        <p className="text-sm text-gray-600 mt-2 text-center capitalize">
                          {fig.replace(/_/g, " ").replace(".png", "")}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading analysis data...</p>
          </div>
        )}
      </div>
    </div>
  );
}




