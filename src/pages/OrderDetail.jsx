import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../services/apiClient';
import Card from '../components/Card';
import Button from '../components/Button';
import toast from 'react-hot-toast';

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const { data } = await apiClient.get(`/orders/${id}`);
      setOrder(data);
    } catch (error) {
      toast.error('Erro ao carregar pedido');
    } finally {
      setLoading(false);
    }
  };

  const confirmPayment = async () => {
    try {
      await apiClient.post('/payments/confirm', { orderId: id });
      toast.success('Pagamento confirmado!');
      fetchOrder();
    } catch (error) {
      toast.error('Erro ao confirmar pagamento');
    }
  };

  if (loading) return <div className="text-center p-10">Carregando...</div>;
  if (!order) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Pedido #{order.id || order._id}</h2>
        <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium uppercase">{order.status}</span>
      </div>
      
      <Card className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Itens</h3>
        <div className="space-y-2">
          {order.items && order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <span className="text-gray-700">{item.quantity}x {item.product?.name || 'Produto'}</span>
              <span className="font-medium">R$ {Number(item.price || 0).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-4 border-t text-lg font-bold">
          <span>Total</span>
          <span className="text-sky-600">R$ {Number(order.totalAmount || 0).toFixed(2)}</span>
        </div>
      </Card>

      <Card className="space-y-2">
        <h3 className="text-xl font-bold text-gray-900">Entrega</h3>
        <p className="text-gray-600"><span className="font-medium">Endereço:</span> {order.address}</p>
        <p className="text-gray-600"><span className="font-medium">Método:</span> {order.deliveryMethod}</p>
      </Card>

      {order.status === 'pending' && (
        <Button onClick={confirmPayment} variant="solid" className="w-full py-3 text-lg">
          Confirmar Pagamento
        </Button>
      )}
    </div>
  );
}
