import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { ArrowRight, Brain, Shield, Zap, BarChart3, CheckCircle2, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg border border-purple-100">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI-Powered Mental Wellness Detection
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight">
              <span className="block text-gray-900">Understand</span>
              <span className="block mt-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Mental Wellness
              </span>
              <span className="block text-gray-900 mt-2">Through AI</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed">
              Advanced machine learning models analyze text patterns to identify stress and mental health indicators.
              Get instant insights with our state-of-the-art NLP technology.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/detect"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
              >
                <span>Try It Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/results"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-2xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200"
              >
                <BarChart3 className="w-5 h-5" />
                <span>View Results</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="pt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  77.89%
                </div>
                <div className="text-sm text-gray-600 mt-1">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  2,838
                </div>
                <div className="text-sm text-gray-600 mt-1">Samples</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  4 Models
                </div>
                <div className="text-sm text-gray-600 mt-1">Ensemble</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with cutting-edge technology to provide accurate and actionable insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative p-8 bg-gradient-to-br from-blue-50 to-white rounded-3xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Advanced NLP
              </h3>
              <p className="text-gray-600 leading-relaxed">
                State-of-the-art natural language processing models trained on extensive datasets for accurate mental health pattern detection.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative p-8 bg-gradient-to-br from-purple-50 to-white rounded-3xl border-2 border-purple-100 hover:border-purple-300 hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Privacy First
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your data is processed securely with no third-party sharing. All analysis happens in real-time without permanent storage.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative p-8 bg-gradient-to-br from-indigo-50 to-white rounded-3xl border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Instant Results
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get immediate analysis with detailed confidence scores and explanations. No waiting, no complexity - just insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to get comprehensive mental wellness insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Enter Text</h3>
                <p className="text-gray-600">
                  Paste or type any text you want to analyze. Can be social media posts, journal entries, or any written content.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">AI Analysis</h3>
                <p className="text-gray-600">
                  Our fusion ensemble model processes the text using advanced NLP techniques and multiple ML algorithms.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xl font-bold mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Get Insights</h3>
                <p className="text-gray-600">
                  Receive detailed analysis with confidence scores, stress indicators, and actionable wellness recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Model Info Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-12 text-white shadow-2xl">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Built on Advanced Machine Learning
              </h2>
              <p className="text-lg text-blue-100 mb-8">
                Our Fusion Ensemble combines 4 powerful models trained on 2,838 samples with 119 features, achieving 77.89% accuracy with balanced precision and recall.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <span className="text-left">BaggingSGD + FeatureUnion</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <span className="text-left">LogisticRegression + TF-IDF</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <span className="text-left">BaggingSGD + TF-IDF</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <span className="text-left">RidgeClassifier + TF-IDF</span>
                </div>
              </div>
              <Link
                href="/model-metrics"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-blue-50 transition-all shadow-lg"
              >
                <span>View Detailed Metrics</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Start analyzing text for mental wellness indicators with our advanced AI system.
            It's fast, accurate, and completely free to use.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/detect"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
            >
              <span>Analyze Text Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/awareness"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-2xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200"
            >
              <span>Learn About Mental Wellness</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
