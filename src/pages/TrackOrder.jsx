import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../services/apiClient';
import Card from '../components/Card';
import { CheckCircle, Circle } from 'lucide-react';

export default function TrackOrder() {
  const { id } = useParams();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const { data } = await apiClient.get(`/orders/track/${id}`);
        setStatus(data.status); // Assuming API returns { status: 'shipped', ... }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000); // Polling every 10s
    return () => clearInterval(interval);
  }, [id]);

  const steps = ['pending', 'paid', 'shipped', 'delivered'];
  const currentStepIndex = steps.indexOf(status);

  if (loading) return <div className="text-center p-10">Carregando...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-center text-gray-900">Rastreamento</h2>
      <Card className="p-8">
        <div className="relative flex justify-between items-center">
          {/* Progress Bar Background */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
          {/* Active Progress Bar */}
          <div 
            className="absolute top-1/2 left-0 h-1 bg-sky-600 -z-10 transform -translate-y-1/2 transition-all duration-500"
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          ></div>

          {steps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            return (
              <div key={step} className="flex flex-col items-center bg-white px-2">
                {isCompleted ? (
                  <CheckCircle className="text-sky-600 bg-white" size={32} fill="white" />
                ) : (
                  <Circle className="text-gray-300 bg-white" size={32} fill="white" />
                )}
                <span className="text-xs font-medium mt-2 uppercase text-gray-500">{step}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <p className="text-lg font-medium text-gray-900">Status atual: <span className="text-sky-600 uppercase">{status}</span></p>
        </div>
      </Card>
    </div>
  );
}
