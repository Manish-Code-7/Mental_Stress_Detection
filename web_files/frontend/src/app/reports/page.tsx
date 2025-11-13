"use client";
import { useState, useEffect } from "react";
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BACKEND_BASE_URL } from "@/lib/backend-config";

interface Figure {
  filename: string;
  url: string;
  category: string;
}

export default function ReportsPage() {
  const [figures, setFigures] = useState<Figure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadFigures = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/figures");
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to fetch figures");
        
        // Categorize figures
        const categorized: Figure[] = data.figures.map((filename: string) => {
          let category = "Other";
          if (filename.includes("wordcloud")) category = "Word Clouds";
          else if (filename.includes("distribution")) category = "Distributions";
          else if (filename.includes("subreddit")) category = "Subreddit Analysis";
          else if (filename.includes("label")) category = "Label Analysis";
          
          return {
            filename,
            url: `${BACKEND_BASE_URL}/figures/${filename}`,
            category,
          };
        });
        
        setFigures(categorized);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    loadFigures();
  }, []);

  const categories = Array.from(new Set(figures.map(f => f.category)));
  const figuresByCategory = categories.reduce((acc, cat) => {
    acc[cat] = figures.filter(f => f.category === cat);
    return acc;
  }, {} as Record<string, Figure[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <NavBar />
        <div className="max-w-7xl mx-auto px-4 py-10">
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <NavBar />
        <div className="max-w-7xl mx-auto px-4 py-10">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Analysis Reports & Visualizations
          </h1>
          <p className="text-gray-600">
            Interactive visualizations and insights from the mental stress detection dataset
          </p>
        </div>

        <Tabs defaultValue={categories[0] || "all"} className="w-full">
          <TabsList className="grid w-full mb-6" style={{ gridTemplateColumns: `repeat(${Math.min(categories.length, 4)}, 1fr)` }}>
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {figuresByCategory[category]?.map((figure) => (
                  <Card
                    key={figure.filename}
                    className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedImage(figure.url)}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg truncate">
                        {figure.filename.replace(/_/g, " ").replace(/\.png$/i, "")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="relative w-full h-64 bg-gray-100 group">
                        <img
                          src={figure.url}
                          alt={figure.filename}
                          className="object-contain w-full h-full transition-transform group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium">
                            Click to view full size
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-7xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl font-bold"
              >
                ×
              </button>
              <img
                src={selectedImage}
                alt="Full size"
                className="max-w-full max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

