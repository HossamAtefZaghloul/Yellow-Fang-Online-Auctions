// layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import ClientLayout from './ClientLayout';
import ReduxProvider from './components/ReduxProvider'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mystery Museum',
  description: 'Showcase of paintings and artifacts',
  icons: '/2.png',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ClientLayout>{children}</ClientLayout>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
