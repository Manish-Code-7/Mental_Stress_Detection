"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function NavBar() {
  const pathname = usePathname();
  const linkClass = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      pathname === path ? "bg-purple-600 text-white" : "text-stone-700 hover:bg-amber-100"
    }`;

  const [healthy, setHealthy] = useState<boolean | null>(null);
  useEffect(() => {
    let mounted = true;
    const ping = async () => {
      try {
        // Ping through the Next proxy so CORS/env is consistent
        const res = await fetch("/api/stats");
        if (!mounted) return;
        setHealthy(res.ok);
      } catch {
        if (mounted) setHealthy(false);
      }
    };
    ping();
    const id = setInterval(ping, 5000);
    return () => { mounted = false; clearInterval(id); };
  }, []);

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-purple-700">
          Mental Stress Detection
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/detect" className={linkClass("/detect")}>Detect</Link>
          <Link href="/eda" className={linkClass("/eda")}>EDA</Link>
          <Link href="/reports" className={linkClass("/reports")}>Reports</Link>
          <Link href="/awareness" className={linkClass("/awareness")}>Awareness</Link>
          <span className={`inline-flex items-center gap-1 text-xs ${healthy ? 'text-green-700' : healthy === false ? 'text-amber-700' : 'text-stone-500'}`}>
            <span className={`h-2 w-2 rounded-full ${healthy ? 'bg-green-600' : healthy === false ? 'bg-amber-600' : 'bg-stone-400'}`} />
            {healthy ? 'Connected' : healthy === false ? 'Offline' : 'Checking...'}
          </span>
        </div>
      </div>
    </nav>
  );
}


