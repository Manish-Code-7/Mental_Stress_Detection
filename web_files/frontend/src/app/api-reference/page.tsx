"use client";
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BACKEND_BASE_URL } from "@/lib/backend-config";

export default function APIReferencePage() {
  const baseUrl = BACKEND_BASE_URL;

  const endpoints = [
    {
      method: "GET",
      path: "/",
      description: "Get API information and available endpoints",
      response: {
        service: "Mental Stress Detection Backend",
        health: "/health",
        predict: "/predict",
        stats: "/stats",
        // ... other endpoints
      }
    },
    {
      method: "GET",
      path: "/health",
      description: "Check API health and model status",
      response: {
        status: "healthy",
        model_loaded: true,
        model_type: "fusion_ensemble",
        model_attrs: ["predict", "predict_proba"],
        label_encoder_loaded: true
      }
    },
    {
      method: "POST",
      path: "/predict",
      description: "Predict stress level from text input",
      request: {
        text: "I feel so stressed and overwhelmed with work"
      },
      response: {
        label: "Stress",
        probability: 0.8567
      }
    },
    {
      method: "GET",
      path: "/stats",
      description: "Get prediction statistics",
      response: {
        total: 150,
        stress: 85,
        nonStress: 65,
        recent: [
          {
            label: "Stress",
            probability: 0.8567,
            ts: "2025-11-11T22:00:00Z"
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/dataset-stats",
      description: "Get dataset statistics and trends",
      response: {
        stress: 1500,
        nonStress: 1338,
        trend: [
          { day: "1", stress: 200, nonStress: 180 },
          { day: "2", stress: 220, nonStress: 190 }
        ]
      }
    },
    {
      method: "GET",
      path: "/eda",
      description: "Get Exploratory Data Analysis results",
      response: {
        basic_stats: {
          shape: [2838, 117],
          memory_mb: 4.76,
          duplicates: 0,
          missing_total: 0
        },
        label_distribution: { "0": 1338, "1": 1500 },
        word_frequencies: [["word", 100], ["another", 50]],
        text_length_distribution: [
          { bucket: "0-100", count: 500 }
        ],
        subreddit_stats: { /* ... */ }
      }
    },
    {
      method: "GET",
      path: "/metrics",
      description: "Get model evaluation metrics",
      response: {
        accuracy: 0.746,
        precision: 0.747,
        recall: 0.746,
        f1_score: 0.747,
        model_type: "Fusion Ensemble",
        source: "fusion_ensemble_info"
      }
    },
    {
      method: "GET",
      path: "/figures",
      description: "List available visualization figures",
      response: {
        figures: [
          "text_wordcloud_1.png",
          "label_distribution.png",
          // ... more figures
        ]
      }
    },
    {
      method: "GET",
      path: "/figures/{filename}",
      description: "Get a specific figure image",
      example: "/figures/text_wordcloud_1.png"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">API Reference</h1>
          <p className="text-gray-600 text-lg">
            Complete documentation for all API endpoints
          </p>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg inline-block">
            <code className="text-sm text-blue-800">Base URL: {baseUrl}</code>
          </div>
        </div>

        <div className="space-y-6">
          {endpoints.map((endpoint, idx) => (
            <Card key={idx}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded text-sm font-semibold ${
                    endpoint.method === "GET" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="text-lg font-mono">{endpoint.path}</code>
                </div>
                <p className="text-gray-600 mt-2">{endpoint.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {endpoint.request && (
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Request Body:</h4>
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                      {JSON.stringify(endpoint.request, null, 2)}
                    </pre>
                  </div>
                )}
                {endpoint.response && (
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Response:</h4>
                    <pre className="bg-gray-900 text-blue-400 p-4 rounded-lg overflow-x-auto text-sm">
                      {JSON.stringify(endpoint.response, null, 2)}
                    </pre>
                  </div>
                )}
                {endpoint.example && (
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Example:</h4>
                    <code className="bg-gray-100 p-2 rounded text-sm block">
                      {baseUrl}{endpoint.example}
                    </code>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Currently, the API does not require authentication. All endpoints are publicly accessible. 
              In production, consider implementing API keys or OAuth2 for security.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Rate Limiting</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Rate limiting is not currently implemented. For production use, consider adding rate limits 
              to prevent abuse (e.g., 100 requests per minute per IP).
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Error Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <code className="bg-red-50 text-red-700 px-2 py-1 rounded text-sm">400 Bad Request</code>
                <p className="text-sm text-gray-600 mt-1">Invalid request format or missing required fields</p>
              </div>
              <div>
                <code className="bg-red-50 text-red-700 px-2 py-1 rounded text-sm">404 Not Found</code>
                <p className="text-sm text-gray-600 mt-1">Resource not found</p>
              </div>
              <div>
                <code className="bg-red-50 text-red-700 px-2 py-1 rounded text-sm">500 Internal Server Error</code>
                <p className="text-sm text-gray-600 mt-1">Server error or model not loaded</p>
              </div>
              <div>
                <code className="bg-red-50 text-red-700 px-2 py-1 rounded text-sm">502 Bad Gateway</code>
                <p className="text-sm text-gray-600 mt-1">Backend service unavailable</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

