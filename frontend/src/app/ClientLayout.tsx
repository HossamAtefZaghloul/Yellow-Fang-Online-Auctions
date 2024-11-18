"use client";

import { usePathname } from "next/navigation";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showHeaderFooter = pathname !== "/login" && pathname !== "/register";

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="164036916869-gohps9d2g19ehu6j379n59rei2c8k5dp.apps.googleusercontent.com">
        {showHeaderFooter && <Header />}
        <main className="flex-grow">{children}</main>
        {showHeaderFooter && <Footer />}
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
