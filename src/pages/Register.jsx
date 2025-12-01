import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FormField from '../components/FormField';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Register() {


  const validatePassword = (password) => {
        // 1) spaces
        if (/\s/.test(password)) {
            return { valid: false, message: "Password must not contain spaces." };
        }

        // 2) accented or non-ASCII characters
        if (/[^\x00-\x7F]/.test(password)) {
            return { valid: false, message: "Password must not contain accented or non-ASCII characters." };
        }

        // 3) characters not allowed (only A-Za-z0-9 and @$!%*?&_. allowed)
        const allowedRegex = /^[A-Za-z\d@$!%*?&_.]+$/;
        if (!allowedRegex.test(password)) {
            return { valid: false, message: "Password contains invalid characters. Allowed: letters, numbers, and @ $ ! % * ? & _ ." };
        }

        // 4) length
        if (password.length < 8) {
            return { valid: false, message: "Password must be at least 8 characters long." };
        }

        // 5) composition requirements
        if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[@$!%*?&_.]/.test(password)) {
            return { valid: false, message: "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (@ $ ! % * ? & _ .)." };
        }

        return { valid: true };
    };



  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const success = await registerUser(data);
    if (success) navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-full py-10">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Crie sua conta</h2>
          <p className="text-gray-500">Preencha seus dados para começar</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            label="Nome"
            placeholder="Seu nome completo"
            error={errors.name}
            {...register('name', { required: 'Nome é obrigatório' })}
          />
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
            {...register('password', { required: 'Senha é obrigatória', 
              validate: (value) => { 
                let passwordTest = validatePassword(value);
                if(passwordTest.valid) { return true; }
                return passwordTest.message;}
              })}
          />
          <FormField
            label="Telefone"
            placeholder="(00) 00000-0000"
            error={errors.phone}
            {...register('phone')}
          />
          <FormField
            label="Endereço"
            placeholder="Rua, Número, Bairro"
            error={errors.address}
            {...register('address')}
          />
          <Button type="submit" variant="solid" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Já tem uma conta? <Link to="/login" className="text-sky-600 hover:underline">Faça login</Link>
        </p>
      </Card>
    </div>
  );
}
