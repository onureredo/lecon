import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextData, AuthProviderProps } from '../types';
import axios from 'axios';
import Cookies from 'js-cookie';

const apiURL = process.env.NEXT_PUBLIC_API_URL;
const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fetchUser = async () => {
    const token = Cookies.get('token');
    if (!token) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(`${apiURL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      console.log(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiURL}/auth/login`, {
        email,
        password,
      });
      setUser(response.data);
      Cookies.set('token', response.data.token);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
      throw err;
    }
  };

  const register = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiURL}/auth/register`, data);
      setUser(response.data);
      Cookies.set('token', response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
      throw err;
    }
  };

  const logout = () => {
    setIsLoading(true);
    setUser(null);
    Cookies.remove('token');
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
    // console.log(user);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook that shorthand the context!
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('Authentication Error');
  }
  return context;
};
