"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Wait until mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a fallback or nothing to prevent hydration error
    return <>{children}</>; 
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}