import { AnimationProvider } from "@/components/providers/animation-provider"
import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://ravirajput-portfolio.vercel.app"),
  title: "Ravi Rajput | Java Backend Developer",
  description:
    "Portfolio of Ravi Rajput - Java Backend Developer specializing in Spring Boot and RESTful APIs.",
  keywords: [
    "Ravi Rajput",
    "Java Backend Developer",
    "Spring Boot",
    "Java Developer",
    "Backend Engineer",
  ],
  openGraph: {
    title: "Ravi Rajput | Java Backend Developer",
    description:
      "Portfolio of Ravi Rajput - Java Backend Developer specializing in Spring Boot and RESTful APIs.",
    url: "https://ravirajput-portfolio.vercel.app",
    siteName: "Ravi Rajput Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ravi Rajput Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ravi Rajput | Java Backend Developer",
    description:
      "Portfolio of Ravi Rajput - Java Backend Developer specializing in Spring Boot and RESTful APIs.",
    images: ["/og-image.png"],
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font - sans antialiased custom - cursor - active`}
      >
        <AnimationProvider>
          {children}
          <Analytics />
        </AnimationProvider>
      </body>
    </html>
  )
}
