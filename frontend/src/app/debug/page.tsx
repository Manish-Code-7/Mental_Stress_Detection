"use client";
import { useEffect, useState } from "react";

type J = any;

export default function DebugPage() {
  const [health, setHealth] = useState<J>(null);
  const [stats, setStats] = useState<J>(null);
  const [ds, setDs] = useState<J>(null);
  const [eda, setEda] = useState<J>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [h, s, d, e] = await Promise.all([
          fetch("/api/health"),
          fetch("/api/stats"),
          fetch("/api/dataset-stats"),
          fetch("/api/eda"),
        ]);
        setHealth(await h.json());
        setStats(await s.json());
        setDs(await d.json());
        setEda(await e.json());
      } catch (e: any) {
        setErr(e?.message ?? String(e));
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white p-6">
      <h1 className="text-2xl font-bold mb-4">Debug: Backend Connectivity</h1>
      {err && <div className="text-red-600">{err}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <pre className="rounded-xl border bg-white p-4 overflow-auto"><b>/api/health</b>\n{JSON.stringify(health, null, 2)}</pre>
        <pre className="rounded-xl border bg-white p-4 overflow-auto"><b>/api/stats</b>\n{JSON.stringify(stats, null, 2)}</pre>
        <pre className="rounded-xl border bg-white p-4 overflow-auto md:col-span-1"><b>/api/dataset-stats</b>\n{JSON.stringify(ds, null, 2)}</pre>
        <pre className="rounded-xl border bg-white p-4 overflow-auto md:col-span-1"><b>/api/eda</b>\n{JSON.stringify(eda, null, 2)}</pre>
      </div>
    </div>
  );
}


