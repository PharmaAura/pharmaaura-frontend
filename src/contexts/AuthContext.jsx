import { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../services/apiClient';
import { getToken, setToken, removeToken, getUser, setUser, removeUser } from '../utils/storage';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setAuthState] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    const storedUser = getUser();
    if (token && storedUser) {
      setAuthState(storedUser);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await apiClient.post('/auth/login', { email, password });
      setToken(data.token);
      setUser(data.user);
      setAuthState(data.user);
      setIsAuthenticated(true);
      toast.success('Login realizado com sucesso!');
      return true;
    } catch (error) {
      console.error(error);
      toast.error('Erro ao fazer login. Verifique suas credenciais.');
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const { data } = await apiClient.post('/auth/register', userData);
      setToken(data.token);
      setUser(data.user);
      setAuthState(data.user);
      setIsAuthenticated(true);
      toast.success('Cadastro realizado com sucesso!');
      return true;
    } catch (error) {
      console.error(error);
      toast.error('Erro ao cadastrar. Tente novamente.');
      return false;
    }
  };

  const logout = () => {
    removeToken();
    removeUser();
    setAuthState(null);
    setIsAuthenticated(false);
    toast.success('Logout realizado.');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
