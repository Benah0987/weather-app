import type { Metadata } from 'next';
import './globals.css'; // Import the CSS

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'A simple weather app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}