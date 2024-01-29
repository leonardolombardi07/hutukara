import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { APP_NAME } from "./constants";
import ThemeProvider from "./_layout/ThemeProvider";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${APP_NAME}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={roboto.className}>
        <AppRouterCacheProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
