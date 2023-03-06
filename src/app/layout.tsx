import './globals.css'

export const metadata = {
  title: 'GQGMC Data feed',
  description: 'Interfaces with GQGMC driver for CPM/CPS data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
