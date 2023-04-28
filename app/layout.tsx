import './globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import StyledComponentsRegistry from '../lib/registry';

const inter = Noto_Sans_KR({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: "JaeSeong' Profile",
  description: 'JaeSeong, front-end web dev profile page',
  icon: '/favicon.ico',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
