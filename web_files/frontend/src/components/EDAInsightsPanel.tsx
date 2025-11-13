"use client";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

interface Insight {
  type: "warning" | "caution" | "success" | "info";
  message: string;
}

export function EDAInsightsPanel() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/eda");
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to fetch EDA data");
        setInsights(json.insights || []);
      } catch (e: any) {
        console.error("Failed to load insights:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (insights.length === 0) {
    return (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>No insights available</AlertTitle>
        <AlertDescription>
          Run EDA analysis to generate insights about your dataset.
        </AlertDescription>
      </Alert>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "caution":
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-600" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-3">
      {insights.map((insight, idx) => (
        <Alert 
          key={idx} 
          variant={insight.type === "warning" || insight.type === "caution" ? "destructive" : "default"}
          className={insight.type === "success" ? "border-green-200 bg-green-50" : insight.type === "info" ? "border-blue-200 bg-blue-50" : ""}
        >
          <div className="flex items-start gap-3">
            {getIcon(insight.type)}
            <div className="flex-1">
              <AlertDescription className={insight.type === "success" ? "text-green-800" : insight.type === "info" ? "text-blue-800" : ""}>
                {insight.message}
              </AlertDescription>
            </div>
          </div>
        </Alert>
      ))}
    </div>
  );
}

