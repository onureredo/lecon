import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextData, AuthProviderProps } from '../types';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  // Call the /auth/login endpoint with the provided username and password
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://lecon-app.onrender.com/auth/login',
        { username, password }
      );
      setUser(response.data.user);
      Cookies.set('token', response.data.token); // Store the token in a cookie named 'token'
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
      Cookies.set('token', response.data.token); // Store the token in a cookie named 'token'
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
    Cookies.remove('token'); // Remove the 'token' cookie
    setIsLoading(false);
  };

  // Use an effect to fetch the current user data whenever the component is mounted
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const token = Cookies.get('token'); // Get the token from the 'token' cookie
        const response = await axios.get(
          'https://lecon-app.onrender.com/auth/me',
          { headers: { Authorization: `Bearer ${token}` } } // Include the token in the request headers
        );
        setUser(response.data.user);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
