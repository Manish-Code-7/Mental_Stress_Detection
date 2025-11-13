"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SkeletonLoader } from "@/components/SkeletonLoader";

interface BasicStats {
  shape?: [number, number];
  memory_mb?: number;
  duplicates?: number;
  missing_total?: number;
}

export function EDAMetricsPanel() {
  const [stats, setStats] = useState<BasicStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/eda");
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to fetch EDA data");
        setStats(json.basic_stats || json.summary || {});
      } catch (e: any) {
        console.error("Failed to load EDA metrics:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!stats) {
    return <div className="text-sm text-gray-600">No metrics available</div>;
  }

  const shape = stats.shape || [0, 0];
  const memory = stats.memory_mb || 0;
  const duplicates = stats.duplicates || 0;
  const missing = stats.missing_total || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Dataset Shape</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {shape[0].toLocaleString()} × {shape[1]}
          </div>
          <p className="text-xs text-gray-500 mt-1">Rows × Columns</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Memory Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{memory.toFixed(2)} MB</div>
          <p className="text-xs text-gray-500 mt-1">Total memory</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Duplicates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{duplicates.toLocaleString()}</div>
          <p className="text-xs text-gray-500 mt-1">
            {shape[0] > 0 ? ((duplicates / shape[0]) * 100).toFixed(2) : 0}% of dataset
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Missing Values</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{missing.toLocaleString()}</div>
          <p className="text-xs text-gray-500 mt-1">
            {shape[0] > 0 ? ((missing / (shape[0] * shape[1])) * 100).toFixed(2) : 0}% of cells
          </p>
        </CardContent>
      </Card>
    </div>
  );
}




