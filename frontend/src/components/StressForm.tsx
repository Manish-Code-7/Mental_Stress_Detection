"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Props = {
  onResult: (data: { label: string; probability: number }) => void;
};

export function StressForm({ onResult }: Props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Prediction failed");
      }
      onResult(data);
      toast.success(`Prediction: ${data.label}`, { description: `Confidence ${(data.probability * 100).toFixed(1)}%` });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      toast.error("Prediction failed", { description: err.message ?? "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Describe how you feel..."
        rows={5}
      />
      <Button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700">
        {loading ? "Analyzing..." : "Analyze Stress"}
      </Button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}


