import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { StatsPanel } from "@/components/StatsPanel";
import { MetricsPanel } from "@/components/MetricsPanel";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-transparent to-transparent" />
        <NavBar />
        <section className="max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 backdrop-blur px-3 py-1 text-sm text-blue-700">
            Mental Health Awareness
          </div>
          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Detect stress from text with modern NLP
          </h1>
          <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
            An AI-powered tool to identify stress signals in language with confidence scores. Built with Next.js, shadcn/ui, and FastAPI.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/detect" className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white shadow hover:bg-blue-700">
              Try Detection
            </Link>
            <Link href="/awareness" className="inline-flex items-center justify-center rounded-lg border px-6 py-3 text-gray-800 hover:bg-gray-50">
              Learn More
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border bg-white p-6 text-left shadow-sm">
              <div className="text-blue-600 font-semibold">Accurate</div>
              <p className="mt-2 text-gray-600">Trained scikit-learn models with TF-IDF vectorization provide reliable predictions.</p>
            </div>
            <div className="rounded-2xl border bg-white p-6 text-left shadow-sm">
              <div className="text-blue-600 font-semibold">Private</div>
              <p className="mt-2 text-gray-600">Your text is processed locally by the API—no third-party sharing.</p>
            </div>
            <div className="rounded-2xl border bg-white p-6 text-left shadow-sm">
              <div className="text-blue-600 font-semibold">Insightful</div>
              <p className="mt-2 text-gray-600">Confidence probabilities help interpret predictions and understand uncertainty.</p>
            </div>
          </div>
        </section>
      </div>

      <section className="border-t bg-white/50">
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold">How it works</h2>
            <p className="mt-3 text-gray-700">We vectorize input text using TF-IDF and classify it with a linear model (e.g., Logistic Regression). The backend returns a label and probability.</p>
            <div className="mt-6 flex gap-3">
              <Link href="/detect" className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700">Start now</Link>
              <Link href="/awareness" className="rounded-lg border px-5 py-2.5 hover:bg-gray-50">See awareness tips</Link>
            </div>
          </div>
          <div className="space-y-6">
            <StatsPanel />
            <MetricsPanel />
          </div>
        </div>
      </section>
    </div>
  );
}
