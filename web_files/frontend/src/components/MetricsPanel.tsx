"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Metrics {
  accuracy?: number;
  precision?: number;
  recall?: number;
  f1_score?: number;
  model_type?: string;
  source?: string;
  message?: string;
}

export function MetricsPanel() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/metrics");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || "Failed to fetch metrics");
        }
        
        // Handle case where API returns a message instead of metrics
        if (data.message) {
          setError(data.message);
          setMetrics(null);
        } else {
          // Ensure we have valid metrics data
          if (data.accuracy || data.precision || data.recall || data.f1_score) {
            setMetrics(data);
          } else {
            console.warn("Metrics data received but values are 0 or missing:", data);
            setMetrics(data); // Still set it to show the structure
          }
        }
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Failed to load metrics");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formatMetric = (value: number | undefined): string => {
    if (value === undefined || value === null || isNaN(value)) return "-";
    if (typeof value === "number" && value > 0) {
      return value.toFixed(3);
    }
    return "-";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Metrics</CardTitle>
        {metrics?.model_type && (
          <p className="text-sm text-gray-500 mt-1">{metrics.model_type}</p>
        )}
        {metrics?.source && (
          <p className="text-xs text-gray-400 mt-1">Source: {metrics.source}</p>
        )}
      </CardHeader>
      <CardContent>
        {loading && <p className="text-stone-600">Loading metrics…</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!loading && !error && metrics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border p-4 bg-gradient-to-br from-blue-50 to-white">
              <div className="text-stone-500 text-sm mb-1">Accuracy</div>
              {metrics.accuracy !== undefined && metrics.accuracy > 0 ? (
                <>
                  <div className="text-3xl font-bold text-blue-600">
                    {formatMetric(metrics.accuracy)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {(metrics.accuracy * 100).toFixed(1)}%
                  </div>
                </>
              ) : (
                <div className="text-lg text-gray-400">Loading...</div>
              )}
            </div>
            <div className="rounded-xl border p-4 bg-gradient-to-br from-green-50 to-white">
              <div className="text-stone-500 text-sm mb-1">Precision</div>
              {metrics.precision !== undefined && metrics.precision > 0 ? (
                <>
                  <div className="text-3xl font-bold text-green-600">
                    {formatMetric(metrics.precision)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {(metrics.precision * 100).toFixed(1)}%
                  </div>
                </>
              ) : (
                <div className="text-lg text-gray-400">Loading...</div>
              )}
            </div>
            <div className="rounded-xl border p-4 bg-gradient-to-br from-purple-50 to-white">
              <div className="text-stone-500 text-sm mb-1">Recall</div>
              {metrics.recall !== undefined && metrics.recall > 0 ? (
                <>
                  <div className="text-3xl font-bold text-purple-600">
                    {formatMetric(metrics.recall)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {(metrics.recall * 100).toFixed(1)}%
                  </div>
                </>
              ) : (
                <div className="text-lg text-gray-400">Loading...</div>
              )}
            </div>
          </div>
        )}
        {metrics?.f1_score !== undefined && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-stone-500 text-sm">F1 Score</span>
              <span className="text-xl font-semibold text-indigo-600">
                {formatMetric(metrics.f1_score)}
                {metrics.f1_score > 0 && (
                  <span className="text-sm text-gray-500 ml-2">
                    ({(metrics.f1_score * 100).toFixed(1)}%)
                  </span>
                )}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


