"use client";
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: November 2025</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                This Privacy Policy describes how the Mental Stress Detection application ("we", "our", or "the application") 
                handles information when you use our service. We are committed to protecting your privacy and ensuring the 
                security of your data.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Text Input</h3>
                <p className="text-sm text-gray-700">
                  When you use the stress detection feature, you may provide text input for analysis. 
                  This text is processed in real-time to generate predictions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Usage Statistics</h3>
                <p className="text-sm text-gray-700">
                  We collect anonymized usage statistics including prediction counts, labels, and timestamps 
                  for the purpose of improving our service and understanding usage patterns.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Technical Information</h3>
                <p className="text-sm text-gray-700">
                  We may collect technical information such as IP addresses, browser type, and device information 
                  for security and analytics purposes.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc list-inside text-gray-700">
                <li>To provide and improve our stress detection service</li>
                <li>To generate predictions and confidence scores</li>
                <li>To analyze usage patterns and improve model performance</li>
                <li>To ensure the security and functionality of our application</li>
                <li>To comply with legal obligations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Storage and Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold mb-2">Text Input</h3>
                  <p className="text-sm text-gray-700">
                    Text input provided for stress detection is processed in real-time and is not permanently 
                    stored on our servers. Predictions and anonymized statistics may be retained for service 
                    improvement purposes.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Statistics</h3>
                  <p className="text-sm text-gray-700">
                    Anonymized usage statistics are retained for analysis and service improvement. 
                    These statistics do not contain personally identifiable information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">
                We implement appropriate technical and organizational measures to protect your information:
              </p>
              <ul className="space-y-2 list-disc list-inside text-gray-700">
                <li>Secure data transmission using HTTPS</li>
                <li>Server-side security measures</li>
                <li>Regular security assessments</li>
                <li>Limited access to data on a need-to-know basis</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Our application may use third-party services for hosting, analytics, or other functions. 
                These services have their own privacy policies, and we encourage you to review them. 
                We do not sell or share your personal information with third parties for marketing purposes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">You have the right to:</p>
              <ul className="space-y-2 list-disc list-inside text-gray-700">
                <li>Access information about how your data is used</li>
                <li>Request deletion of your data (where applicable)</li>
                <li>Opt out of certain data collection practices</li>
                <li>File a complaint with relevant data protection authorities</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Our service is not intended for children under the age of 13. We do not knowingly collect 
                personal information from children. If you believe we have collected information from a child, 
                please contact us immediately.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page and updating the "Last updated" date. 
                You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy, please contact us through our 
                <a href="/contact" className="text-purple-600 hover:underline ml-1">contact page</a>.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

