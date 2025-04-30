import localFont from "next/font/local";
import SessionWrapper from "@/providers/SessionWrapper";
import { Inter } from "next/font/google";
import "@/css/globals.css";

import { AppProvider } from "@/providers/AppProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { Providers } from "@/redux/provider";
import { OrgProvider } from "@/providers/OrgProvider";
import { Toaster } from "@/components/ui/sonner";
//import { OrgModalProvider } from "@/providers/OrgModalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: process.env.APP_NAME,
    template: `%s | ${process.env.APP_NAME}`
  },
  description: 'Devlomatix',
  icon: {
    icon: ['/fevicon.png?v=1'],
    apple: ['/fevicon.png?v=4'],
    shortcut: ['/fevicon.png?v=4']
  },
  manifest: '/site.webmanifest'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} `} suppressHydrationWarning={true}>
        <SessionWrapper>
          <AppProvider>
            <ThemeProvider>
              <AuthProvider>
                <Providers>
                  <OrgProvider>
                    {/* <OrgModalProvider /> */}
                    {children}
                  </OrgProvider>
                </Providers>
              </AuthProvider>
            </ThemeProvider>
          </AppProvider>
        </SessionWrapper>
        <Toaster richColors />
      </body>
    </html>
  );
}
