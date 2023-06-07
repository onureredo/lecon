export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  bio: string;
  profileImage: string;
  bgImage: string;
  followers: Array<string>;
  following: Array<string>;
  theme: 'light' | 'dark';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  error: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
