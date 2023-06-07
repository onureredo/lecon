import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextData, AuthProviderProps } from '../types';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  // Function to fetch the current user's data
  const fetchUser = async () => {
    const token = Cookies.get('token');
    if (!token) {
      // No token, so user is not logged in
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(
        'https://lecon-app.onrender.com/auth/me',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response.data.user);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  // Call the /auth/login endpoint with the provided username and password
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://lecon-app.onrender.com/auth/login',
        { email, password }
      );
      setUser(response.data.user);
      Cookies.set('token', response.data.token);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  // Call the /auth/register endpoint with the provided data
  const register = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://lecon-app.onrender.com/auth/register',
        data
      );
      setUser(response.data.user);
      Cookies.set('token', response.data.token);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  // Log the user out by clearing the user data from state and removing the token cookie
  const logout = () => {
    setIsLoading(true);
    setUser(null);
    Cookies.remove('token');
    setIsLoading(false);
  };

  // Use an effect to fetch the current user data whenever the component is mounted
  useEffect(() => {
    fetchUser();
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
