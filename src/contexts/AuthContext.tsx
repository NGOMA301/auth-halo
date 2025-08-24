import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const makeRequest = async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_URL}/api/auth${endpoint}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  };

  const checkAuth = async () => {
    try {
      setLoading(true);
      const data = await makeRequest('/profile');
      if (data.success && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error: any) {
      setUser(null);
      // Only show session expired message if user was previously logged in
      if (user && error.message.includes('token') || error.message.includes('expired')) {
        toast({
          title: "Session Expired",
          description: "Please log in again to continue.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await makeRequest('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (data.success && data.user) {
        setUser(data.user);
        toast({
          title: "Welcome back!",
          description: `Logged in as ${data.user.name}`,
        });
        return true;
      }
      return false;
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const data = await makeRequest('/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });

      if (data.success && data.user) {
        setUser(data.user);
        toast({
          title: "Account Created!",
          description: `Welcome, ${data.user.name}!`,
        });
        return true;
      }
      return false;
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Unable to create account",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      await makeRequest('/logout');
      setUser(null);
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
      });
    } catch (error: any) {
      // Even if logout fails on server, clear local state
      setUser(null);
      toast({
        title: "Logged Out",
        description: "You have been logged out.",
      });
    }
  };

  const deleteAccount = async () => {
    try {
      await makeRequest('/delete/account/', {
        method: 'DELETE',
      });
      setUser(null);
      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted.",
      });
    } catch (error: any) {
      toast({
        title: "Delete Failed",
        description: error.message || "Unable to delete account",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    checkAuth();
    
    // Check auth status every 5 minutes
    const interval = setInterval(checkAuth, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};