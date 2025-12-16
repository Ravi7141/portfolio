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
  metadataBase: new URL("https://adityarajbr-portfolio.vercel.app"),
  title: "Aditya Raj | Creative Developer",
  description:
    "Portfolio of the Future – Crafting digital experiences that push boundaries",
  keywords: [
    "Aditya Raj",
    "Full Stack Developer",
    "Creative Developer",
    "Next.js Portfolio",
    "React Developer",
  ],
  openGraph: {
    title: "Aditya Raj | Creative Developer",
    description:
      "Portfolio of the Future – Crafting digital experiences that push boundaries",
    url: "https://adityarajbr-portfolio.vercel.app",
    siteName: "Aditya Raj Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aditya Raj Portfolio Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Raj | Creative Developer",
    description:
      "Portfolio of the Future – Crafting digital experiences that push boundaries",
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
        className={`${ spaceGrotesk.variable } ${ jetbrainsMono.variable } font - sans antialiased custom - cursor - active`}
      >
        <AnimationProvider>
          {children}
          <Analytics />
        </AnimationProvider>
      </body>
    </html>
  )
}
