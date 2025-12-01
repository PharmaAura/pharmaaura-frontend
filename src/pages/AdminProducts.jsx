import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiClient';
import Button from '../components/Button';
import Card from '../components/Card';
import { Edit, Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const deleteProduct = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;
    try {
      await apiClient.delete(`/products/${id}`);
      setProducts(products.filter(p => (p.id || p._id) !== id));
      toast.success('Produto excluído');
    } catch (error) {
      toast.error('Erro ao excluir produto');
    }
  };

  if (loading) return <div className="text-center p-10">Carregando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Gerenciar Produtos</h2>
        <Link to="/admin/products/new">
          <Button variant="solid" className="flex items-center gap-2">
            <Plus size={20} /> Novo Produto
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <Card key={product.id || product._id} className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img
                src={product.imageUrl || 'https://placehold.co/50'}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-lg bg-gray-100"
              />
              <div>
                <h3 className="font-bold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">R$ {Number(product.price).toFixed(2)} | Estoque: {product.stock}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to={`/admin/products/${product.id || product._id}/edit`}>
                <Button variant="outline" className="p-2 rounded-full">
                  <Edit size={18} />
                </Button>
              </Link>
              <Button 
                variant="danger" 
                className="p-2 rounded-full bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700"
                onClick={() => deleteProduct(product.id || product._id)}
              >
                <Trash2 size={18} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
