import './globals.css'

export const metadata = {
  title: 'Mountebank UI'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}