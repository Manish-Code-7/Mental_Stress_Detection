"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MetricsPanel() {
  const [metrics, setMetrics] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/metrics");
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to fetch metrics");
        setMetrics(data);
      } catch (e: any) {
        setError(e.message);
      }
    };
    load();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!metrics && !error && <p className="text-stone-600">Loading metrics…</p>}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border p-4">
              <div className="text-stone-500 text-sm">Accuracy</div>
              <div className="text-2xl font-semibold">{metrics.accuracy?.toFixed?.(3) ?? metrics.accuracy ?? "-"}</div>
            </div>
            <div className="rounded-xl border p-4">
              <div className="text-stone-500 text-sm">Precision</div>
              <div className="text-2xl font-semibold">{metrics.precision?.toFixed?.(3) ?? metrics.precision ?? "-"}</div>
            </div>
            <div className="rounded-xl border p-4">
              <div className="text-stone-500 text-sm">Recall</div>
              <div className="text-2xl font-semibold">{metrics.recall?.toFixed?.(3) ?? metrics.recall ?? "-"}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


