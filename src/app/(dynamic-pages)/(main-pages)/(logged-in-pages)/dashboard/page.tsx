import { ClientPage } from './ClientPage';

export const dynamic = 'force-dynamic';

export default function NewItem() {
  return (
    <div className="h-screen p-8">
      <ClientPage />
    </div>
  );
}
