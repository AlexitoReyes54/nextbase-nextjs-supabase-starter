import dynamic from 'next/dynamic';
import { Inter, Roboto_Mono } from 'next/font/google';
import { MigrationProvider } from '../contexts/MigrationContext';
import { UserProvider } from '../contexts/UserContext';
import { ClientLayout } from './ClientLayout';
import './globals.css';
import { PHProvider } from './providers';
const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
  ssr: false,
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const metadata = {
  title: 'Nomad',
  description: 'Migration tool for Woocommerce to Shopify',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MigrationProvider>
      <html
        lang="en"
        className={`${inter.variable} ${roboto_mono.variable} bg-white	`}
      >
        <head />
        <body>
          <div className="">
            <UserProvider>
              <PHProvider>
                <PostHogPageView />
                {/* <ExternalNavigation /> */}
                <ClientLayout>{children}</ClientLayout>
                {/* <Footer /> */}
              </PHProvider>
            </UserProvider>
          </div>
        </body>
      </html>
    </MigrationProvider>
  );
}
