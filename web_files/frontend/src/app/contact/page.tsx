"use client";
import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent!", {
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Contact Us</h1>
          <p className="text-gray-600 text-lg">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Project Information</h3>
                <p className="text-sm text-gray-600">
                  Mental Stress Detection is an open-source project demonstrating the application 
                  of machine learning and natural language processing in mental health awareness.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Support</h3>
                <p className="text-sm text-gray-600">
                  For technical support, bug reports, or feature requests, please use the contact 
                  form or refer to our documentation.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Resources</h3>
                <div className="space-y-2 text-sm">
                  <a href="/documentation" className="text-purple-600 hover:underline block">
                    📚 Documentation
                  </a>
                  <a href="/api-reference" className="text-purple-600 hover:underline block">
                    🔌 API Reference
                  </a>
                  <a href="/about" className="text-purple-600 hover:underline block">
                    ℹ️ About Project
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-sm text-gray-600">
                  We typically respond within 2-3 business days. For urgent matters, please 
                  refer to our documentation for immediate assistance.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    placeholder="What is this regarding?"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    placeholder="Your message here..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">How accurate is the stress detection?</h3>
                <p className="text-sm text-gray-600">
                  Our fusion ensemble model achieves approximately 74.6% accuracy with balanced 
                  precision and recall. See our{" "}
                  <a href="/model-metrics" className="text-purple-600 hover:underline">
                    Model Metrics
                  </a>{" "}
                  page for detailed performance statistics.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Is my data stored?</h3>
                <p className="text-sm text-gray-600">
                  Text input is processed in real-time and not permanently stored. Only anonymized 
                  usage statistics are retained. See our{" "}
                  <a href="/privacy" className="text-purple-600 hover:underline">
                    Privacy Policy
                  </a>{" "}
                  for more details.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Can I use the API programmatically?</h3>
                <p className="text-sm text-gray-600">
                  Yes! Check out our{" "}
                  <a href="/api-reference" className="text-purple-600 hover:underline">
                    API Reference
                  </a>{" "}
                  for complete documentation on all available endpoints.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Is this a medical diagnosis tool?</h3>
                <p className="text-sm text-gray-600">
                  No. This service is for informational and educational purposes only. It should not 
                  be used as a substitute for professional medical advice. See our{" "}
                  <a href="/terms" className="text-purple-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  for the medical disclaimer.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

