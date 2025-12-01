import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../services/apiClient';
import FormField from '../components/FormField';
import Button from '../components/Button';
import Card from '../components/Card';
import toast from 'react-hot-toast';

export default function AdminProductForm() {
  const { id } = useParams();
  const isEditMode = !!id;
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode) {
      apiClient.get(`/products/${id}`).then(({ data }) => reset(data));
    }
  }, [id, isEditMode, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await apiClient.put(`/products/${id}`, data);
        toast.success('Produto atualizado!');
      } else {
        await apiClient.post('/products', data);
        toast.success('Produto criado!');
      }
      navigate('/admin/products');
    } catch (error) {
      toast.error('Erro ao salvar produto');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">{isEditMode ? 'Editar Produto' : 'Novo Produto'}</h2>
      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            label="Nome"
            placeholder="Nome do produto"
            error={errors.name}
            {...register('name', { required: 'Nome é obrigatório' })}
          />
          <FormField
            label="Descrição"
            placeholder="Descrição detalhada"
            error={errors.description}
            {...register('description', { required: 'Descrição é obrigatória' })}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Preço"
              type="number"
              step="0.01"
              placeholder="0.00"
              error={errors.price}
              {...register('price', { required: 'Preço é obrigatório', min: 0 })}
            />
            <FormField
              label="Estoque"
              type="number"
              placeholder="0"
              error={errors.stock}
              {...register('stock', { required: 'Estoque é obrigatório', min: 0 })}
            />
          </div>
          <FormField
            label="URL da Imagem"
            placeholder="https://..."
            error={errors.imageUrl}
            {...register('imageUrl')}
          />
          <Button type="submit" variant="solid" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar Produto'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
