import { Geist, Geist_Mono } from "next/font/google"
import { LanguageProvider } from "@/components/language-context"
import "./globals.css"
import ReduxProvider from "@/store/ReduxProvider"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "HealthMate - Your Personal Health Companion",
  description: "AI-powered personal health companion app for managing medical reports and health vitals",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
