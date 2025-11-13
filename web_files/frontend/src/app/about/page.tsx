"use client";
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">About the Project</h1>
          <p className="text-gray-600 text-lg">
            Understanding mental stress through AI and natural language processing
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                The Mental Stress Detection project is an innovative web application that leverages advanced 
                machine learning and natural language processing techniques to identify stress indicators in 
                textual content. The system analyzes user-provided text and classifies it as either "Stress" 
                or "Non-Stress" with confidence scores.
              </p>
              <p className="text-gray-700">
                This project was developed to demonstrate the practical application of NLP and ML in mental 
                health awareness, providing a tool that can help identify stress signals in written communication.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold mt-1">✓</span>
                  <div>
                    <div className="font-semibold">Accurate Detection</div>
                    <div className="text-sm text-gray-600">
                      Achieve high accuracy in identifying stress signals using ensemble machine learning models
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold mt-1">✓</span>
                  <div>
                    <div className="font-semibold">User-Friendly Interface</div>
                    <div className="text-sm text-gray-600">
                      Provide an intuitive and accessible web interface for stress detection
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold mt-1">✓</span>
                  <div>
                    <div className="font-semibold">Comprehensive Analysis</div>
                    <div className="text-sm text-gray-600">
                      Offer detailed EDA, metrics, and visualizations for understanding the dataset and model performance
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold mt-1">✓</span>
                  <div>
                    <div className="font-semibold">Educational Value</div>
                    <div className="text-sm text-gray-600">
                      Serve as a learning resource for NLP, ML, and web development practices
                    </div>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. Data Collection & Preprocessing</h3>
                <p className="text-sm text-gray-700">
                  The system uses a dataset of text samples labeled as stress or non-stress. 
                  Text is preprocessed to normalize and clean the input data.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">2. Feature Extraction</h3>
                <p className="text-sm text-gray-700">
                  TF-IDF (Term Frequency-Inverse Document Frequency) vectorization is used to convert 
                  text into numerical features. The system uses n-grams (1-2) to capture word patterns.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">3. Model Training</h3>
                <p className="text-sm text-gray-700">
                  Multiple models are trained and combined into a Fusion Ensemble, which weights 
                  predictions from different models to achieve optimal accuracy.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">4. Prediction</h3>
                <p className="text-sm text-gray-700">
                  When a user submits text, it's processed through the same pipeline and the 
                  ensemble model provides a prediction with a confidence score.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technical Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                  <div className="font-semibold text-blue-900 mb-1">Fusion Ensemble</div>
                  <div className="text-sm text-gray-700">
                    Combines 4 different models with weighted voting for improved accuracy
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                  <div className="font-semibold text-green-900 mb-1">TF-IDF Vectorization</div>
                  <div className="text-sm text-gray-700">
                    Advanced text feature extraction with n-gram analysis
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                  <div className="font-semibold text-purple-900 mb-1">74.6% Accuracy</div>
                  <div className="text-sm text-gray-700">
                    High-performance model with balanced precision and recall
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg">
                  <div className="font-semibold text-yellow-900 mb-1">Modern Stack</div>
                  <div className="text-sm text-gray-700">
                    Next.js, React, Flask, scikit-learn for production-ready deployment
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Use Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                  <div className="font-semibold">Mental Health Monitoring</div>
                  <div className="text-sm text-gray-600">
                    Help individuals identify stress patterns in their written communication
                  </div>
                </div>
                <div className="p-3 border-l-4 border-green-500 bg-green-50">
                  <div className="font-semibold">Research & Analysis</div>
                  <div className="text-sm text-gray-600">
                    Analyze text datasets for stress indicators in research contexts
                  </div>
                </div>
                <div className="p-3 border-l-4 border-purple-500 bg-purple-50">
                  <div className="font-semibold">Educational Tool</div>
                  <div className="text-sm text-gray-600">
                    Demonstrate NLP and ML concepts in a practical, accessible format
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learn More</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/documentation"
                  className="p-4 border rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <div className="font-semibold text-purple-700">Documentation</div>
                  <div className="text-sm text-gray-600 mt-1">Complete technical documentation</div>
                </Link>
                <Link
                  href="/api-reference"
                  className="p-4 border rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <div className="font-semibold text-blue-700">API Reference</div>
                  <div className="text-sm text-gray-600 mt-1">API endpoint documentation</div>
                </Link>
                <Link
                  href="/model-metrics"
                  className="p-4 border rounded-lg hover:bg-green-50 transition-colors"
                >
                  <div className="font-semibold text-green-700">Model Metrics</div>
                  <div className="text-sm text-gray-600 mt-1">Performance metrics and evaluation</div>
                </Link>
                <Link
                  href="/dataset-stats"
                  className="p-4 border rounded-lg hover:bg-orange-50 transition-colors"
                >
                  <div className="font-semibold text-orange-700">Dataset Stats</div>
                  <div className="text-sm text-gray-600 mt-1">Dataset statistics and analysis</div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

