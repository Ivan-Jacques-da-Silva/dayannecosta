import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/context/auth-context"
import { FavoritesProvider } from "@/context/favorites-context"
import { ViewedPropertiesProvider } from "@/context/viewed-properties-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Miami Luxury Estates",
  description: "Find your dream home in Miami",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="theme-preference"
          disableTransitionOnChange
        >
          <AuthProvider>
            <FavoritesProvider>
              <ViewedPropertiesProvider>
                <div className="flex min-h-screen flex-col">
                  <Navbar />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
                <Toaster />
              </ViewedPropertiesProvider>
            </FavoritesProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
