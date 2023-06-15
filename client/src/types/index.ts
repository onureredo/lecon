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
  location: string;
  profileImage: string;
  bgImage: string;
  likes: string;
  following: Array<string>;
  followers: Array<string>;
  theme: 'light' | 'dark';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  posts: any[];
}
export interface Post {
  _id: string;
  content: string;
  likes: string[];
  reposts: string[];
  comments: string[];
  hashtags: string[];
  mentions: string[];
  createdAt: string;
  updatedAt: string;
  author: User | null;
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
  fetchUser: () => Promise<void>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
