import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Quincy Sproul | Portfolio',
  description: 'Portfolio of Quincy Sproul - Data Scientist & Machine Learning Engineer',
  keywords: ['Data Science', 'Machine Learning', 'Portfolio', 'Engineering Mathematics'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}