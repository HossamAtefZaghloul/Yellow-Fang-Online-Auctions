// ClientLayout.tsx
"use client";

import { usePathname } from 'next/navigation';
import Header from './components/Header';
import Footer from './components/Footer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const showHeaderFooter = pathname !== '/login';

  return (
    <>
      {showHeaderFooter && <Header />}
      <main className="flex-grow">{children}</main>
      {showHeaderFooter && <Footer />}
    </>
  );
}
