import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import FormField from '../components/FormField';
import Button from '../components/Button';
import Card from '../components/Card';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { data: order } = await apiClient.post('/orders/create', data);
      toast.success('Pedido realizado com sucesso!');
      navigate(`/orders/${order.id || order._id}`);
    } catch (error) {
      toast.error('Erro ao finalizar pedido');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Checkout</h2>
      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            label="Endereço de Entrega"
            placeholder="Rua, Número, Bairro, Cidade - UF"
            error={errors.address}
            {...register('address', { required: 'Endereço é obrigatório' })}
          />
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Método de Entrega</label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              {...register('deliveryMethod', { required: true })}
            >
              <option value="retirada">Retirar na Loja</option>
              <option value="delivery">Entregar em Endereço</option>
            </select>
          </div>
          <Button type="submit" variant="solid" className="w-full py-3 text-lg" disabled={isSubmitting}>
            {isSubmitting ? 'Processando...' : 'Confirmar Pedido'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
