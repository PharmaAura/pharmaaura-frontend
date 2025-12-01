import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiClient';
import Card from '../components/Card';
import Button from '../components/Button';
import { Package } from 'lucide-react';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await apiClient.get('/orders/user');
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="text-center p-10">Carregando...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Meus Pedidos</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">Você ainda não fez nenhum pedido.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id || order._id} className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-sky-100 p-3 rounded-full text-sky-600">
                  <Package size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Pedido #{order.id || order._id}</h3>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm font-medium text-sky-600">{order.status}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link to={`/orders/${order.id || order._id}`}>
                  <Button variant="outline" className="text-sm">Detalhes</Button>
                </Link>
                <Link to={`/orders/track/${order.id || order._id}`}>
                  <Button variant="primary" className="text-sm">Rastrear</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
