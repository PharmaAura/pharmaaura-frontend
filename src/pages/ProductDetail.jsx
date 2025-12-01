import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import Button from '../components/Button';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await apiClient.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      toast.error('Erro ao carregar produto');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Faça login para adicionar ao carrinho');
      return;
    }
    try {
      await apiClient.post('/cart/add', { productId: product.id || product._id, quantity });
      toast.success('Produto adicionado ao carrinho');
    } catch (error) {
      toast.error('Erro ao adicionar ao carrinho');
    }
  };

  if (loading) return <div className="text-center p-10">Carregando...</div>;
  if (!product) return null;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-gray-100 aspect-square md:aspect-auto">
          <img
            src={product.imageUrl || 'https://placehold.co/600'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8 space-y-6 flex flex-col justify-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-2xl font-bold text-sky-600 mt-2">R$ {Number(product.price).toFixed(2)}</p>
          </div>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <span className="font-medium text-gray-700">Quantidade:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 text-gray-600"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100 text-gray-600"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <Button variant="solid" className="w-full py-3 flex items-center justify-center gap-2" onClick={addToCart}>
              <ShoppingCart size={20} />
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
