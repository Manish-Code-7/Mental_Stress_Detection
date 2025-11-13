"use client";
import { useState, useEffect } from "react";
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MetricsPanel } from "@/components/MetricsPanel";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ModelMetricsPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/metrics");
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to fetch metrics");
        setMetrics(data);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Failed to load metrics");
      } finally {
        setLoading(false);
      }
    };
    loadMetrics();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Model Metrics</h1>
          <p className="text-gray-600">
            Comprehensive performance metrics and evaluation results
          </p>
        </div>

        {loading && <SkeletonLoader />}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!loading && !error && (
          <>
            <MetricsPanel />

            {metrics && (
              <>
                {metrics.model_type && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Model Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Model Type</div>
                          <div className="text-lg font-semibold">{metrics.model_type}</div>
                        </div>
                        {metrics.num_models && (
                          <div>
                            <div className="text-sm text-gray-600">Number of Models</div>
                            <div className="text-lg font-semibold">{metrics.num_models}</div>
                          </div>
                        )}
                        {metrics.source && (
                          <div>
                            <div className="text-sm text-gray-600">Data Source</div>
                            <div className="text-lg font-semibold">{metrics.source}</div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {metrics.confusion_matrix && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Confusion Matrix</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr>
                              <th className="border p-2"></th>
                              <th className="border p-2">Predicted: Non-Stress</th>
                              <th className="border p-2">Predicted: Stress</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border p-2 font-semibold">Actual: Non-Stress</td>
                              <td className="border p-2 text-center">{metrics.confusion_matrix[0]?.[0] || "-"}</td>
                              <td className="border p-2 text-center">{metrics.confusion_matrix[0]?.[1] || "-"}</td>
                            </tr>
                            <tr>
                              <td className="border p-2 font-semibold">Actual: Stress</td>
                              <td className="border p-2 text-center">{metrics.confusion_matrix[1]?.[0] || "-"}</td>
                              <td className="border p-2 text-center">{metrics.confusion_matrix[1]?.[1] || "-"}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="font-medium">Accuracy</span>
                        <span className="text-lg font-bold text-blue-600">
                          {metrics.accuracy ? (metrics.accuracy * 100).toFixed(2) + "%" : "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="font-medium">Precision</span>
                        <span className="text-lg font-bold text-green-600">
                          {metrics.precision ? (metrics.precision * 100).toFixed(2) + "%" : "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="font-medium">Recall</span>
                        <span className="text-lg font-bold text-purple-600">
                          {metrics.recall ? (metrics.recall * 100).toFixed(2) + "%" : "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="font-medium">F1 Score</span>
                        <span className="text-lg font-bold text-indigo-600">
                          {metrics.f1_score ? (metrics.f1_score * 100).toFixed(2) + "%" : "N/A"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

