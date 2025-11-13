"use client";
import { NavBar } from "@/components/NavBar";
import { EnhancedEDACharts } from "@/components/EnhancedEDACharts";
import { EDAMetricsPanel } from "@/components/EDAMetricsPanel";
import { EDAInsightsPanel } from "@/components/EDAInsightsPanel";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SkeletonLoader } from "@/components/SkeletonLoader";

export default function EDAPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Exploratory Data Analysis
          </h1>
          <p className="text-gray-600">
            Comprehensive analysis of the mental stress detection dataset
          </p>
        </div>

        {/* Insights Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Mental Health Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <EDAInsightsPanel />
          </CardContent>
        </Card>

        {/* Metrics Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Dataset Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <EDAMetricsPanel />
          </CardContent>
        </Card>

        {/* Main EDA Charts */}
        <Card>
          <CardHeader>
            <CardTitle>Data Visualizations</CardTitle>
          </CardHeader>
          <CardContent>
            <EnhancedEDACharts />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}




