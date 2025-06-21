import './globals.css'

export const metadata = {
  title: 'Product Store',
  description: 'Modern product management application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}