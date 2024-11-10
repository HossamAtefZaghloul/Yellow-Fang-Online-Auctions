import type { Metadata } from 'next'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mystery Museum',
  description: 'Showcase of paintings and artifacts',
  icons:"/1dsda.jpg"
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}