import React, { createContext, useContext, useState } from 'react';
import { User, AuthContextData, AuthProviderProps } from '../types';

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  // This function would call your /users/login endpoint
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    // Make API call here, on success setUser, on error setError
    setIsLoading(false);
  };

  // This function would call your /users/logout endpoint
  const logout = () => {
    setIsLoading(true);
    // Make API call here, on success setUser(null)
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook that shorhands the context!
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
