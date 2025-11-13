"use client";
import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { StressForm } from "@/components/StressForm";
import { ResultCard } from "@/components/ResultCard";
import { MindfulnessSection } from "@/components/MindfulnessSection";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DetectPage() {
  const [result, setResult] = useState<{ label: string; probability: number } | null>(null);
  const isStress = result?.label.toLowerCase() === "stress";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <NavBar />
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Detect Stress from Text</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-stone-700 mb-4">Enter a sentence or paragraph to see if it indicates stress.</p>
            <StressForm onResult={setResult} />
          </CardContent>
        </Card>
        {result && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Result</CardTitle>
              </CardHeader>
              <CardContent>
                <ResultCard label={result.label} probability={result.probability} />
              </CardContent>
            </Card>
            {isStress && <MindfulnessSection />}
          </>
        )}
      </div>
    </div>
  );
}


