import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiClient';
import Card from '../components/Card';
import Button from '../components/Button';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await apiClient.get('/products');
      setProducts(data);
    } catch (error) {
      toast.error('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    if (!isAuthenticated) {
      toast.error('Faça login para adicionar ao carrinho');
      return;
    }
    try {
      await apiClient.post('/cart/add', { productId, quantity: 1 });
      toast.success('Produto adicionado ao carrinho');
    } catch (error) {
      toast.error('Erro ao adicionar ao carrinho');
    }
  };

  if (loading) return <div className="text-center p-10">Carregando...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Nossos Produtos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id || product._id} className="flex flex-col h-full hover:shadow-md transition-shadow duration-200">
            <div className="aspect-square w-full bg-gray-100 rounded-lg mb-4 overflow-hidden">
              <img
                src={product.imageUrl || 'https://placehold.co/400'}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
              <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
              <p className="text-xl font-bold text-sky-600">R$ {Number(product.price).toFixed(2)}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <Link to={`/products/${product.id || product._id}`} className="flex-1">
                <Button variant="outline" className="w-full text-sm">Detalhes</Button>
              </Link>
              <Button variant="solid" className="px-3" onClick={() => addToCart(product.id || product._id)}>
                <ShoppingCart size={18} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
