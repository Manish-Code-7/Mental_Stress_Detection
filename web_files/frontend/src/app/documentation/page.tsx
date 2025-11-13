"use client";
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <NavBar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Documentation</h1>
          <p className="text-gray-600 text-lg">
            Complete guide to understanding and using the Mental Stress Detection system
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What is Mental Stress Detection?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Mental Stress Detection is an AI-powered web application that analyzes text input to identify 
                  stress signals and emotional indicators. The system uses advanced Natural Language Processing (NLP) 
                  and machine learning techniques to classify text as either "Stress" or "Non-Stress" with confidence scores.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Key Features</h3>
                  <ul className="list-disc list-inside space-y-1 text-blue-800">
                    <li>Real-time text analysis with instant predictions</li>
                    <li>Confidence scores for each prediction</li>
                    <li>Comprehensive Exploratory Data Analysis (EDA)</li>
                    <li>Model performance metrics and statistics</li>
                    <li>Interactive visualizations and reports</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technology Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="font-semibold text-sm">Frontend</div>
                    <div className="text-xs text-gray-600 mt-1">Next.js, React, TypeScript</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="font-semibold text-sm">Backend</div>
                    <div className="text-xs text-gray-600 mt-1">Flask, Python</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="font-semibold text-sm">ML Framework</div>
                    <div className="text-xs text-gray-600 mt-1">scikit-learn</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="font-semibold text-sm">Vectorization</div>
                    <div className="text-xs text-gray-600 mt-1">TF-IDF, Feature Union</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="font-semibold text-sm">Models</div>
                    <div className="text-xs text-gray-600 mt-1">Fusion Ensemble</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="font-semibold text-sm">Styling</div>
                    <div className="text-xs text-gray-600 mt-1">Tailwind CSS</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="architecture" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Architecture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">1. Frontend (Next.js)</h3>
                  <p className="text-gray-700 mb-2">
                    The frontend is built with Next.js 15 and React, providing a modern, responsive user interface.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>Server-side rendering for optimal performance</li>
                    <li>API routes for backend communication</li>
                    <li>Interactive charts using Recharts</li>
                    <li>Responsive design with Tailwind CSS</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">2. Backend API (Flask)</h3>
                  <p className="text-gray-700 mb-2">
                    The Flask backend serves as the API layer, handling requests and model inference.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>RESTful API endpoints</li>
                    <li>CORS enabled for cross-origin requests</li>
                    <li>Model loading and prediction handling</li>
                    <li>Data statistics and EDA generation</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">3. Machine Learning Pipeline</h3>
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="font-bold text-purple-600">Step 1:</span>
                        <div>
                          <div className="font-semibold">Text Preprocessing</div>
                          <div className="text-sm text-gray-600">Input text is cleaned and normalized</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="font-bold text-purple-600">Step 2:</span>
                        <div>
                          <div className="font-semibold">Feature Extraction</div>
                          <div className="text-sm text-gray-600">TF-IDF vectorization with n-grams (1-2)</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="font-bold text-purple-600">Step 3:</span>
                        <div>
                          <div className="font-semibold">Model Inference</div>
                          <div className="text-sm text-gray-600">Fusion ensemble makes prediction</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="font-bold text-purple-600">Step 4:</span>
                        <div>
                          <div className="font-semibold">Result Formatting</div>
                          <div className="text-sm text-gray-600">Label and confidence score returned</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fusion Ensemble Model</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  The system uses a Fusion Ensemble that combines multiple models for improved accuracy:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="font-semibold mb-2">1. BaggingSGD + FeatureUnion</div>
                    <div className="text-sm text-gray-600">Weight: 1.0 (highest)</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="font-semibold mb-2">2. LogisticRegression + TF-IDF</div>
                    <div className="text-sm text-gray-600">Weight: 0.98</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="font-semibold mb-2">3. BaggingSGD + TF-IDF</div>
                    <div className="text-sm text-gray-600">Weight: 0.98</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="font-semibold mb-2">4. RidgeClassifier + TF-IDF</div>
                    <div className="text-sm text-gray-600">Weight: 0.97</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded">
                  <div className="text-sm text-green-800">
                    <strong>Performance:</strong> 74.6% Accuracy, 74.7% F1 Score, 74.7% Precision, 74.6% Recall
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workflow" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Prediction Workflow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">User Input</h4>
                      <p className="text-sm text-gray-600">User enters text in the detection interface</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">API Request</h4>
                      <p className="text-sm text-gray-600">Frontend sends POST request to /api/predict</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Backend Processing</h4>
                      <p className="text-sm text-gray-600">Flask backend receives request and processes text</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold">Model Inference</h4>
                      <p className="text-sm text-gray-600">Fusion ensemble model makes prediction</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h4 className="font-semibold">Result Display</h4>
                      <p className="text-sm text-gray-600">Prediction and confidence score shown to user</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                  <div className="space-y-2">
                    <div>User Text → Frontend → API Route → Backend</div>
                    <div className="text-gray-500">↓</div>
                    <div>Text Preprocessing → Vectorization → Model Prediction</div>
                    <div className="text-gray-500">↓</div>
                    <div>Label + Confidence → JSON Response → Frontend Display</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>How to Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">1. Stress Detection</h3>
                  <p className="text-gray-700 text-sm">
                    Navigate to the "Detect" page, enter your text in the textarea, and click "Analyze Stress". 
                    The system will return a label (Stress/Non-Stress) and a confidence score.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">2. View EDA</h3>
                  <p className="text-gray-700 text-sm">
                    Visit the "EDA" page to explore dataset statistics, distributions, text analysis, 
                    correlations, and subreddit analysis.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">3. Check Reports</h3>
                  <p className="text-gray-700 text-sm">
                    The "Reports" page displays interactive visualizations including word clouds, 
                    distribution charts, and analysis figures.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">4. View Metrics</h3>
                  <p className="text-gray-700 text-sm">
                    Model performance metrics are displayed on the home page and can be accessed 
                    via the API for programmatic access.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

