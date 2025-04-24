import type { Metadata } from 'next';
import './globals.css'; // Import the CSS

// Import Font Awesome
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import Font Awesome CSS
config.autoAddCss = false; // Prevent Font Awesome from adding its CSS automatically (we already imported it)

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