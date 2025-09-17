"use client";
import { NavBar } from "@/components/NavBar";
import { SentimentChart } from "@/components/SentimentChart";
import { EDACharts } from "@/components/EDACharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartSkeleton } from "@/components/SkeletonLoader";
import { useEffect, useState } from "react";

export default function AwarenessPage() {
  const [pieData, setPieData] = useState<{ name: string; value: number }[]>([]);
  const [trendData, setTrendData] = useState<{ day: string; stress: number; nonStress: number }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/dataset-stats");
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load dataset stats");
        setPieData([
          { name: "Stress", value: data.stress ?? 0 },
          { name: "Non-Stress", value: data.nonStress ?? 0 },
        ]);
        setTrendData(data.trend ?? []);
      } catch (e: any) {
        setError(e.message || "Failed to load dataset stats");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <NavBar />
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        <h1 className="text-3xl font-bold">Stress Awareness</h1>
        <p className="text-gray-700">
          Learn about stress indicators, coping strategies, and how language signals mental well-being.
        </p>
        <Tabs defaultValue="dataset" className="w-full">
          <TabsList>
            <TabsTrigger value="dataset">Dataset</TabsTrigger>
            <TabsTrigger value="eda">EDA</TabsTrigger>
          </TabsList>
          <TabsContent value="dataset" className="mt-6">
            {loading && <ChartSkeleton />}
            {error && <div className="text-red-600 text-sm">{error}</div>}
            {!loading && !error && (
              <SentimentChart pieData={pieData} trendData={trendData} />
            )}
          </TabsContent>
          <TabsContent value="eda" className="mt-6">
            <EDACharts />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


