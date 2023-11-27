import { Inter } from "next/font/google";
import "./globals.css";
import { TanstackProvider } from "@/app/providers/TanstackProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Recruitment task</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <body className={inter.className}>
        <Toaster position="top-right" />
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}
