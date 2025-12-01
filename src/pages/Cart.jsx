import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiClient';
import Button from '../components/Button';
import Card from '../components/Card';
import { Trash2, Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const { data } = await apiClient.get('/cart');
      setCart(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await apiClient.post('/cart/add', { productId, quantity });
      fetchCart();
    } catch (error) {
      toast.error('Erro ao atualizar quantidade');
    }
  };

  const removeItem = async (productId) => {
    try {
      await apiClient.delete(`/cart/remove/${productId}`);
      fetchCart();
      toast.success('Item removido');
    } catch (error) {
      toast.error('Erro ao remover item');
    }
  };

  if (loading) return <div className="text-center p-10">Carregando...</div>;
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Seu carrinho está vazio</h2>
        <Link to="/products">
          <Button variant="solid">Ver Produtos</Button>
        </Link>
      </div>
    );
  }

  const total = cart.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Seu Carrinho</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <Card key={item.product.id || item.product._id} className="flex gap-4 items-center">
              <img
                src={item.product.imageUrl || 'https://placehold.co/100'}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-lg bg-gray-100"
              />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{item.product.name}</h3>
                <p className="text-sky-600 font-medium">R$ {Number(item.product.price).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    onClick={() => updateQuantity(item.product.id || item.product._id, -1)}
                    className="p-1 hover:bg-gray-100 text-gray-600"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-2 text-sm font-medium">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.product.id || item.product._id, 1)}
                    className="p-1 hover:bg-gray-100 text-gray-600"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button 
                  onClick={() => removeItem(item.product.id || item.product._id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </Card>
          ))}
        </div>
        <div className="lg:col-span-1">
          <Card className="sticky top-24 space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Resumo</h3>
            <div className="flex justify-between text-lg font-medium">
              <span>Total</span>
              <span className="text-sky-600">R$ {total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="block">
              <Button variant="solid" className="w-full">Finalizar Compra</Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
