import { Inter } from 'next/font/google'
import './globals.css'
import { TanstackProvider } from '@/app/providers/TanstackProvider'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <title>Recruitment task</title>
      <body className={inter.className}>
        <Toaster position="top-right" />
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  )
}
