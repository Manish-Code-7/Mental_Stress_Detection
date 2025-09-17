import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Mental Stress Detection",
  description: "Detect stress levels using machine learning",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-stone-50 via-amber-50 to-white`}>        
        {children}
        <Toaster richColors position="top-right" />
        <div className="border-t bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 text-center py-6 text-sm text-stone-600">
          © 2025 Mental Stress Detection
        </div>
      </body>
    </html>
  )
}
