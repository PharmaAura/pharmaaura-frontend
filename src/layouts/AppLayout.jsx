import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Toaster } from 'react-hot-toast';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto h-screen">
        <Outlet />
      </main>
      <Toaster position="top-right" />
    </div>
  );
}
