import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FormField from '../components/FormField';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const success = await login(data.email, data.password);
    if (success) navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Bem-vindo de volta</h2>
          <p className="text-gray-500">Acesse sua conta para continuar</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            label="Email"
            type="email"
            placeholder="seu@email.com"
            error={errors.email}
            {...register('email', { required: 'Email é obrigatório' })}
          />
          <FormField
            label="Senha"
            type="password"
            placeholder="********"
            error={errors.password}
            {...register('password', { required: 'Senha é obrigatória' })}
          />
          <Button type="submit" variant="solid" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Não tem uma conta? <Link to="/register" className="text-sky-600 hover:underline">Cadastre-se</Link>
        </p>
      </Card>
    </div>
  );
}
