"use client";
import { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, BarChart, Bar } from "recharts";

const COLORS = ["#f59e0b", "#7c3aed", "#a78bfa", "#fde68a"]; // amber/purple palette

export function EDACharts() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/eda");
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to fetch EDA");
        setData(json);
      } catch (e: any) {
        setError(e.message);
      }
    };
    load();
  }, []);

  if (error) {
    return <div className="text-sm text-red-600">{error}</div>;
  }

  if (!data) {
    return <div className="text-sm text-stone-600">Loading EDA…</div>;
  }

  // Expect common keys; fallback defensively
  const labelDist = (data.label_distribution || data.class_distribution || data.class_balance || {}).entries || data.label_distribution || data.class_distribution || {};
  const pieData = Array.isArray(labelDist)
    ? labelDist
    : Object.keys(labelDist).map((k) => ({ name: k, value: labelDist[k] }));

  const wordFreq = (data.word_frequencies || data.top_tokens || []).slice(0, 10);
  const wordFreqData = Array.isArray(wordFreq)
    ? wordFreq.map((d: any) => ({ word: d.word || d[0], count: d.count || d[1] }))
    : [];

  const lengthDist = (data.length_distribution || []).slice(0, 20);
  const lengthData = Array.isArray(lengthDist)
    ? lengthDist.map((d: any, i: number) => ({ bucket: d.bucket || d[0] || i, count: d.count || d[1] || d }))
    : [];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold mb-2 text-stone-800">Label distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {pieData.map((_: any, index: number) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold mb-2 text-stone-800">Top words</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wordFreqData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="word" hide={wordFreqData.length > 12} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#7c3aed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="font-semibold mb-2 text-stone-800">Text length distribution</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lengthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bucket" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


