import type { Metadata } from "next";
import { MainHeader } from "@/components/custom/MainHeader";
import { AppSidebar } from "@/components/custom/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: "Two Eyes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <AppSidebar />
            <div className="flex flex-col w-full relative">
              <MainHeader />
              <main className="flex-1 w-full">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
