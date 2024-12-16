// do not cache this layout
export const dynamic = 'force-dynamic';
import { ExternalNavigation } from '../Navbar';

export const metadata = {
  icons: {
    icon: '/images/logo-black-main.ico',
  },
  title: 'Nomad Migration Service',
  description: 'Migrate your data to the cloud with Nomad Migration Service',
};

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex pt-2 flex-col min-h-screen bg-white dark:bg-gray-900">
      <ExternalNavigation />
      {children}
    </div>
  );
}
