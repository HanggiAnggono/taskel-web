import './globals.css'
import { Inter } from 'next/font/google'
import { LogoutButton } from '@/ui/components/LogoutButton'
import { CreateTaskButton } from "@/ui/components/CreateTaskButton"
import ToastProvider from "@/ui/notifications/ToastProvider"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Taskel',
  description: 'A Task list app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex items-center border-b-2 h-16 fixed top-0 w-full bg-white z-50 p-4">
          <div>
            <CreateTaskButton />
          </div>
          <div className="ml-auto">
            <LogoutButton />
          </div>
        </div>
        <div className="mt-16"></div>
        {children}
        <ToastProvider />
      </body>
    </html>
  )
}
