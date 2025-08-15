import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/app/auth/AuthContext";
import { ThemeProvider } from "@/components/theme-provider";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MedAI Assistant - AI-Powered Medical Information",
  description:
    "Get instant, accurate medical information powered by advanced AI. Analyze symptoms, discover treatments, and understand diseases with confidence.",
  keywords:
    "medical AI, health assistant, symptom checker, disease information, treatment options",
  authors: [{ name: "MedAI Assistant Team" }],
  icons: {
    icon: "/logo2.png",
  },
  openGraph: {
    title: "MedAI Assistant - AI-Powered Medical Information",
    description:
      "Your trusted AI-powered medical assistant providing accurate health information and guidance.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MedAI Assistant - AI-Powered Medical Information",
    description:
      "Your trusted AI-powered medical assistant providing accurate health information and guidance.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased custom-scrollbar`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
