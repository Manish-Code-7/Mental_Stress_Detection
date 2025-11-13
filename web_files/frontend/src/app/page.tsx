import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { StatsPanel } from "@/components/StatsPanel";
import { MetricsPanel } from "@/components/MetricsPanel";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden">
        {/* Enhanced gradient background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-purple-50/30 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-50/50 via-transparent to-transparent" />
        </div>
        <NavBar />
        <section className="max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white/80 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-blue-700 shadow-sm hover:shadow-md transition-shadow">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Mental Health Awareness
          </div>
          <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Detect stress from text with modern NLP
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            An AI-powered tool to identify stress signals in language with confidence scores. 
            Built with Next.js, shadcn/ui, and advanced machine learning models.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link 
              href="/detect" 
              className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span>Try Detection</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link 
              href="/eda" 
              className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span>View EDA</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link 
              href="/reports" 
              className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span>View Reports</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link 
              href="/awareness" 
              className="inline-flex items-center justify-center rounded-xl border-2 border-gray-300 bg-white/80 backdrop-blur-sm px-8 py-4 text-gray-800 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group rounded-2xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 text-left shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="text-blue-600 font-bold text-lg mb-2">Accurate</div>
              <p className="text-gray-600 leading-relaxed">
                Fusion ensemble model with 74.6% accuracy. Trained with TF-IDF vectorization and multiple algorithms for reliable predictions.
              </p>
            </div>
            <div className="group rounded-2xl border-2 border-green-100 bg-gradient-to-br from-green-50 to-white p-8 text-left shadow-sm hover:shadow-lg hover:border-green-200 transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <span className="text-2xl">🔒</span>
              </div>
              <div className="text-green-600 font-bold text-lg mb-2">Private</div>
              <p className="text-gray-600 leading-relaxed">
                Your text is processed locally by the API—no third-party sharing. Your privacy is our priority.
              </p>
            </div>
            <div className="group rounded-2xl border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-white p-8 text-left shadow-sm hover:shadow-lg hover:border-purple-200 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <span className="text-2xl">💡</span>
              </div>
              <div className="text-purple-600 font-bold text-lg mb-2">Insightful</div>
              <p className="text-gray-600 leading-relaxed">
                Confidence probabilities help interpret predictions and understand uncertainty. Get detailed analytics and visualizations.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="border-t bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-lg bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700 mb-4">
                <span>⚡</span>
                How it works
              </div>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Advanced AI-Powered Stress Detection
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our system uses a sophisticated fusion ensemble model that combines multiple machine learning 
                algorithms to analyze text and identify stress indicators with high accuracy.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center font-bold text-blue-600">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Text Input</h3>
                    <p className="text-sm text-gray-600">Enter your text through our intuitive interface</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center font-bold text-purple-600">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">AI Processing</h3>
                    <p className="text-sm text-gray-600">TF-IDF vectorization and ensemble model analysis</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center font-bold text-green-600">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Instant Results</h3>
                    <p className="text-sm text-gray-600">Get stress classification with confidence scores</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex gap-4">
                <Link 
                  href="/detect" 
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all"
                >
                  Start Detection
                </Link>
                <Link 
                  href="/awareness" 
                  className="rounded-xl border-2 border-gray-300 bg-white px-6 py-3 text-gray-800 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
                >
                  Stress Management Tips
                </Link>
              </div>
            </div>
            <div className="space-y-6">
              <StatsPanel />
              <MetricsPanel />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
