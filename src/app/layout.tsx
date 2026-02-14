import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // Using Next.js optimized fonts
import "./globals.css";
import { ThemeProvider } from "next-themes"; // You need to create a provider wrapper
import { Providers } from "@/components/providers/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kaiser3DWeb | Interactive 3D Websites",
  description: "High-performance 3D product configurators...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


return (
  <html lang="en" suppressHydrationWarning>
    <head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-PVBGFMZD9R"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-PVBGFMZD9R');
        `}
      </Script>
    </head>
    <body className={poppins.className}>
      <ThemeProvider attribute="class">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </ThemeProvider>
    </body>
  </html>
);
}
