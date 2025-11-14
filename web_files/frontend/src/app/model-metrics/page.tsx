"use client";
import { useState, useEffect } from "react";
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Target, Zap, TrendingUp, Activity, CheckCircle2 } from "lucide-react";

interface ModelMetrics {
  accuracy?: number;
  precision?: number;
  recall?: number;
  f1_score?: number;
  model_type?: string;
  num_models?: number;
  models?: string[];
  confusion_matrix?: number[][];
  source?: string;
  timestamp?: string;
}

export default function ModelMetricsPage() {
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null);
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

  const getPerformanceColor = (value: number) => {
    if (value >= 0.80) return "text-green-600 bg-green-50";
    if (value >= 0.70) return "text-blue-600 bg-blue-50";
    if (value >= 0.60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getPerformanceLabel = (value: number) => {
    if (value >= 0.80) return "Excellent";
    if (value >= 0.70) return "Good";
    if (value >= 0.60) return "Fair";
    return "Needs Improvement";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Model Performance Metrics
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Comprehensive evaluation of the AI model's predictive accuracy
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!loading && metrics && (
          <>
            {/* Model Information */}
            {metrics.model_type && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Model Architecture
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600">Model Type</div>
                        <div className="text-xl font-bold text-blue-600">
                          {metrics.model_type}
                        </div>
                      </div>
                      {metrics.num_models && (
                        <div className="bg-purple-50 rounded-lg p-4">
                          <div className="text-sm text-gray-600">Ensemble Size</div>
                          <div className="text-xl font-bold text-purple-600">
                            {metrics.num_models} Models
                          </div>
                        </div>
                      )}
                    </div>

                    {metrics.models && metrics.models.length > 0 && (
                      <div className="mt-4">
                        <div className="text-sm font-semibold text-gray-700 mb-2">
                          Ensemble Components:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {metrics.models.map((model, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200"
                            >
                              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{model}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Accuracy */}
                  {metrics.accuracy !== undefined && (
                    <div className={`p-5 rounded-lg ${getPerformanceColor(metrics.accuracy)}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-sm font-medium opacity-80">Accuracy</div>
                          <div className="text-3xl font-bold mt-1">
                            {(metrics.accuracy * 100).toFixed(2)}%
                          </div>
                        </div>
                        <div className="text-xs font-semibold px-2 py-1 bg-white/50 rounded">
                          {getPerformanceLabel(metrics.accuracy)}
                        </div>
                      </div>
                      <div className="w-full bg-white/30 rounded-full h-2 mt-3">
                        <div
                          className="h-2 rounded-full bg-current"
                          style={{ width: `${metrics.accuracy * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* F1 Score */}
                  {metrics.f1_score !== undefined && (
                    <div className={`p-5 rounded-lg ${getPerformanceColor(metrics.f1_score)}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-sm font-medium opacity-80">F1 Score</div>
                          <div className="text-3xl font-bold mt-1">
                            {(metrics.f1_score * 100).toFixed(2)}%
                          </div>
                        </div>
                        <div className="text-xs font-semibold px-2 py-1 bg-white/50 rounded">
                          {getPerformanceLabel(metrics.f1_score)}
                        </div>
                      </div>
                      <div className="w-full bg-white/30 rounded-full h-2 mt-3">
                        <div
                          className="h-2 rounded-full bg-current"
                          style={{ width: `${metrics.f1_score * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Precision */}
                  {metrics.precision !== undefined && (
                    <div className={`p-5 rounded-lg ${getPerformanceColor(metrics.precision)}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-sm font-medium opacity-80">Precision</div>
                          <div className="text-3xl font-bold mt-1">
                            {(metrics.precision * 100).toFixed(2)}%
                          </div>
                        </div>
                        <div className="text-xs font-semibold px-2 py-1 bg-white/50 rounded">
                          {getPerformanceLabel(metrics.precision)}
                        </div>
                      </div>
                      <div className="w-full bg-white/30 rounded-full h-2 mt-3">
                        <div
                          className="h-2 rounded-full bg-current"
                          style={{ width: `${metrics.precision * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Recall */}
                  {metrics.recall !== undefined && (
                    <div className={`p-5 rounded-lg ${getPerformanceColor(metrics.recall)}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-sm font-medium opacity-80">Recall</div>
                          <div className="text-3xl font-bold mt-1">
                            {(metrics.recall * 100).toFixed(2)}%
                          </div>
                        </div>
                        <div className="text-xs font-semibold px-2 py-1 bg-white/50 rounded">
                          {getPerformanceLabel(metrics.recall)}
                        </div>
                      </div>
                      <div className="w-full bg-white/30 rounded-full h-2 mt-3">
                        <div
                          className="h-2 rounded-full bg-current"
                          style={{ width: `${metrics.recall * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Metric Descriptions */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Metric Explanations:</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div><strong>Accuracy:</strong> Overall correctness of predictions across all classes</div>
                    <div><strong>Precision:</strong> Accuracy of positive predictions (how many predicted stress cases were correct)</div>
                    <div><strong>Recall:</strong> Coverage of actual positive cases (how many actual stress cases were identified)</div>
                    <div><strong>F1 Score:</strong> Harmonic mean of precision and recall, balanced performance indicator</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Confusion Matrix */}
            {metrics.confusion_matrix && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Confusion Matrix
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border p-3 text-left">Actual \ Predicted</th>
                          <th className="border p-3 text-center bg-green-50">No Stress</th>
                          <th className="border p-3 text-center bg-red-50">Stress</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border p-3 font-semibold bg-green-50">No Stress</td>
                          <td className="border p-3 text-center text-2xl font-bold text-green-600">
                            {metrics.confusion_matrix[0]?.[0] || "-"}
                          </td>
                          <td className="border p-3 text-center text-2xl font-bold text-orange-600">
                            {metrics.confusion_matrix[0]?.[1] || "-"}
                          </td>
                        </tr>
                        <tr>
                          <td className="border p-3 font-semibold bg-red-50">Stress</td>
                          <td className="border p-3 text-center text-2xl font-bold text-orange-600">
                            {metrics.confusion_matrix[1]?.[0] || "-"}
                          </td>
                          <td className="border p-3 text-center text-2xl font-bold text-red-600">
                            {metrics.confusion_matrix[1]?.[1] || "-"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                    <strong>Interpretation:</strong> Green diagonal shows correct predictions, orange shows misclassifications.
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading model metrics...</p>
          </div>
        )}
      </div>
    </div>
  );
}

