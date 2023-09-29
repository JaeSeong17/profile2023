import './globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import StyledComponentsRegistry from '../lib/registry';
import NavBar from '@/components/navbar/NavBar';

const inter = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

export const metadata = {
  title: "JaeSeong' Profile",
  description: 'JaeSeong, front-end web dev profile page',
  icons: '/favicon.ico',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <div>
            <NavBar />
            <div className='overflow-x-hidden sm:ml-[60px] mt-[60px] sm:mt-0'>
              {/* <FramerTransitionRegistry>{children}</FramerTransitionRegistry> */}
              {children}
            </div>
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
