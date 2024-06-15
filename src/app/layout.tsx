import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { QueryProvider } from "@/query/query-provider";
import { WorkerProvider } from "@/components/worker-context/use-worker";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NEET Results",
  description: "Check NEET results",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-background text-primary antialiased`}>
        <WorkerProvider>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NavBar />

              {children}

              <Footer />
            </ThemeProvider>
          </QueryProvider>
        </WorkerProvider>
      </body>
    </html>
  );
}
