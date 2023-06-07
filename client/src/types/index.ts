export interface APIError {
  message: string;
}
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  bio: string;
  profileImage: string;
  bgImage: string;
  following: Array<string>;
  followers: Array<string>;
  theme: 'light' | 'dark';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}
export interface AuthContextData {
  // The currently logged in user, or null if no user is logged in
  user: User | null;
  isLoading: boolean;
  error: APIError | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
