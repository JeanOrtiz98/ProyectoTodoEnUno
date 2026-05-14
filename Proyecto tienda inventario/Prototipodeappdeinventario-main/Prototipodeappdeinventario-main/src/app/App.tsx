import { RouterProvider } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { InventoryProvider } from './context/InventoryContext';
import { Toaster } from './components/ui/sonner';
import { router } from './routes';

export default function App() {
  return (
    <AuthProvider>
      <InventoryProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </InventoryProvider>
    </AuthProvider>
  );
}
