import type { Metadata } from "next";
import { MainHeader } from "@/components/custom/MainHeader";
import { AppSidebar } from "@/components/custom/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
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
            <SidebarInset className="relative flex flex-col overflow-x-hidden">
              <MainHeader />
              {children}
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
