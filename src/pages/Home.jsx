import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function Home() {
  return (
    <div className="h-full grid place-items-center">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
          Sua saúde em primeiro lugar com <span className="text-sky-600">PharmaAura</span>
        </h1>
        <p className="text-xl text-gray-500 font-light">
          Medicamentos, cosméticos e cuidados pessoais entregues na sua porta com rapidez e segurança.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/products">
            <Button variant="solid" className="px-8 py-3 text-lg">Ver Produtos</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
