import './globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import NavBar from '@/components/navbar/NavBar';
import ScreenModeSetter from '@/components/ScreenModeSetter';

const inter = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

export const metadata = {
  title: "JaeSeong' Profile",
  description: 'JaeSeong, front-end web dev profile page',
  icons: '/favicon.ico',
  viewport:
    'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div>
          <NavBar />
          <ScreenModeSetter />
          <div className='overflow-x-hidden sm:ml-[60px] mt-[60px] sm:mt-0'>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
