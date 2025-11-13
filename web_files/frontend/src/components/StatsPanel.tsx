"use client";
import { useEffect, useState } from "react";

type Stat = { total: number; stress: number; nonStress: number; recent: { label: string; probability: number; ts: string }[] };

export function StatsPanel() {
  const [stats, setStats] = useState<Stat | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to fetch stats");
        if (mounted) setStats(data);
      } catch (e: any) {
        if (mounted) setError(e.message);
      }
    };
    fetchStats();
    const id = setInterval(fetchStats, 4000);
    return () => { mounted = false; clearInterval(id); };
  }, []);

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-stone-800">Live Stats</h3>
        {error && <span className="text-xs text-red-600">{error}</span>}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-purple-700">{stats?.total ?? 0}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-amber-700">{stats?.stress ?? 0}</div>
          <div className="text-sm text-stone-600">Stress</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-purple-700">{stats?.nonStress ?? 0}</div>
          <div className="text-sm text-stone-600">Non-Stress</div>
        </div>
      </div>
      <div className="mt-6">
        <div className="text-sm font-medium text-stone-700 mb-2">Recent predictions</div>
        <div className="max-h-48 overflow-y-auto divide-y">
          {(stats?.recent ?? []).slice().reverse().map((r, idx) => (
            <div key={idx} className="py-2 flex items-center justify-between">
              <span className={r.label === 'Stress' ? 'text-amber-700' : 'text-purple-700'}>{r.label}</span>
              <span className="text-gray-600">{(r.probability * 100).toFixed(1)}%</span>
              <span className="text-xs text-gray-400">{new Date(r.ts).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


