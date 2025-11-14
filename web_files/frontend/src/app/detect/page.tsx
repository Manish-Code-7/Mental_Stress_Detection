"use client";
import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { StressForm } from "@/components/StressForm";
import { ResultCard } from "@/components/ResultCard";
import { MindfulnessSection } from "@/components/MindfulnessSection";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Brain, Sparkles, Info, AlertCircle, CheckCircle } from "lucide-react";

export default function DetectPage() {
  const [result, setResult] = useState<{ label: string; probability: number } | null>(null);
  const isStress = result?.label.toLowerCase() === "stress";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <NavBar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 text-sm font-semibold mb-4">
            <Brain className="w-4 h-4" />
            <span>AI Text Analysis</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Mental Wellness Analyzer
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Use our advanced AI model to analyze text for stress and mental health indicators.
            Get instant insights with detailed confidence scores.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Analysis Card */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 border-gray-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Text Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700 mb-6 leading-relaxed text-center">
                  Enter any text you want to analyze. This could be a social media post, journal entry,
                  email, or any written content. Our AI will analyze linguistic patterns to identify
                  potential stress indicators.
                </p>
                <StressForm onResult={setResult} />
              </CardContent>
            </Card>

            {/* Result Card */}
            {result && (
              <>
                <Card className="border-2 shadow-xl animate-fade-in">
                  <CardHeader className={`${
                    isStress
                      ? 'bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100'
                      : 'bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100'
                  }`}>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      {isStress ? (
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                      Analysis Result
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ResultCard label={result.label} probability={result.probability} />
                  </CardContent>
                </Card>

                {isStress && <MindfulnessSection />}
              </>
            )}
          </div>

          {/* Sidebar - Information */}
          <div className="space-y-6">
            {/* How It Works */}
            <Card className="border-2 border-blue-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Text Processing</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Your text is tokenized and analyzed for linguistic patterns
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Feature Extraction</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        119 features extracted using NLP and linguistic analysis
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Ensemble Prediction</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        4 ML models vote to provide accurate classification
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Results & Insights</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Get classification with confidence scores instantly
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Model Info */}
            <Card className="border-2 border-purple-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
                <CardTitle className="text-lg">Model Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Type</span>
                    <span className="font-semibold text-gray-900">Fusion Ensemble</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Models</span>
                    <span className="font-semibold text-gray-900">4 Algorithms</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Accuracy</span>
                    <span className="font-semibold text-green-600">77.89%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Training Samples</span>
                    <span className="font-semibold text-gray-900">2,838</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Features</span>
                    <span className="font-semibold text-gray-900">119</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-xs text-gray-700 leading-relaxed">
                    <strong>Note:</strong> This tool is for informational purposes only and should not
                    replace professional medical advice or diagnosis.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="border-2 border-green-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200">
                <CardTitle className="text-lg">Analysis Tips</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Use complete sentences for better accuracy</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Longer text provides more context</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Natural language works best</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Try different types of text to compare</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
