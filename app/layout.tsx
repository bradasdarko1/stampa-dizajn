import './globals.css'
import Header from '@/components/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr">
      <body className="bg-[#FAFAF7] text-[#222222] pb-16 lg:pb-0">
        <Header />
        {children}
      </body>
    </html>
  )
}
