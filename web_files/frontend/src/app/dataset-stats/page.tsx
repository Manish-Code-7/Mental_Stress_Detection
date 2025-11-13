"use client";
import { useState, useEffect } from "react";
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatsPanel } from "@/components/StatsPanel";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function DatasetStatsPage() {
  const [datasetStats, setDatasetStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/dataset-stats");
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to fetch dataset stats");
        setDatasetStats(data);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Failed to load dataset stats");
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dataset Statistics</h1>
          <p className="text-gray-600">
            Comprehensive statistics and analysis of the training dataset
          </p>
        </div>

        {loading && <SkeletonLoader />}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!loading && !error && datasetStats && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Label Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                      <span className="font-medium">Stress</span>
                      <span className="text-2xl font-bold text-red-600">
                        {datasetStats.stress?.toLocaleString() || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span className="font-medium">Non-Stress</span>
                      <span className="text-2xl font-bold text-green-600">
                        {datasetStats.nonStress?.toLocaleString() || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <span className="font-medium">Total</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {((datasetStats.stress || 0) + (datasetStats.nonStress || 0)).toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="text-sm text-gray-600">
                        Balance Ratio:{" "}
                        <span className="font-semibold">
                          {datasetStats.stress && datasetStats.nonStress
                            ? (datasetStats.stress / datasetStats.nonStress).toFixed(2)
                            : "N/A"}
                          :1
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribution Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "Stress", value: datasetStats.stress || 0 },
                          { name: "Non-Stress", value: datasetStats.nonStress || 0 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#7C3AED" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {datasetStats.trend && datasetStats.trend.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Trend Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={datasetStats.trend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="stress"
                          stroke="#FF6B6B"
                          strokeWidth={2}
                          name="Stress"
                        />
                        <Line
                          type="monotone"
                          dataKey="nonStress"
                          stroke="#4ECDC4"
                          strokeWidth={2}
                          name="Non-Stress"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            <StatsPanel />
          </>
        )}
      </div>
    </div>
  );
}

