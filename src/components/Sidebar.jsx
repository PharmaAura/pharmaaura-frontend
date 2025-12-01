import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Home, ShoppingBag, ShoppingCart, List, LogOut, Settings } from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Produtos', path: '/products', icon: ShoppingBag },
  ];

  if (isAuthenticated) {
    navItems.push({ name: 'Carrinho', path: '/cart', icon: ShoppingCart });
    navItems.push({ name: 'Meus Pedidos', path: '/orders', icon: List });
  }

  if (isAdmin) {
    navItems.push({ name: 'Admin Produtos', path: '/admin/products', icon: Settings });
  }

  return (
    <aside className="w-64 h-screen sticky top-0 bg-white border-r border-gray-200 flex flex-col z-10">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-sky-600 tracking-tight">PharmaAura</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200",
                isActive ? "bg-sky-50 text-sky-600" : "text-gray-600 hover:bg-gray-50 hover:text-sky-600"
              )}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      {isAuthenticated ? (
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={logout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-left text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      ) : (
        <div className="p-4 border-t border-gray-100 space-y-2">
          <Link to="/login" className="block text-center py-2 text-sky-600 font-medium hover:bg-sky-50 rounded-lg transition-colors">Login</Link>
          <Link to="/register" className="block text-center py-2 bg-sky-600 text-white font-medium hover:bg-sky-700 rounded-lg transition-colors">Cadastrar</Link>
        </div>
      )}
    </aside>
  );
}
