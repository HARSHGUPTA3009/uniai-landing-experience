
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  location?: string;
  website?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  // Mock login function
  const login = async (email: string, password: string) => {
    // In a real application, this would make an API call to authenticate the user
    try {
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: email,
        bio: 'Software engineer with a passion for AI and machine learning.',
        location: 'San Francisco, CA',
        website: 'https://johndoe.com',
      };
      
      setUser(mockUser);
      setIsLoggedIn(true);
      
      // Store in localStorage for persistence
      localStorage.setItem('uniaiUser', JSON.stringify(mockUser));
      
      toast({
        title: 'Login successful',
        description: `Welcome back, ${mockUser.name}!`,
      });
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Mock signup function
  const signup = async (name: string, email: string, password: string) => {
    try {
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful signup
      const mockUser: User = {
        id: '1',
        name: name,
        email: email,
        bio: '',
        location: '',
        website: '',
      };
      
      setUser(mockUser);
      setIsLoggedIn(true);
      
      // Store in localStorage for persistence
      localStorage.setItem('uniaiUser', JSON.stringify(mockUser));
      
      toast({
        title: 'Account created',
        description: 'Your account has been created successfully!',
      });
    } catch (error) {
      toast({
        title: 'Signup failed',
        description: 'Could not create your account',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('uniaiUser');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
  };

  // Update profile function
  const updateProfile = async (data: Partial<User>) => {
    try {
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('uniaiUser', JSON.stringify(updatedUser));
        
        toast({
          title: 'Profile updated',
          description: 'Your profile has been updated successfully',
        });
      }
    } catch (error) {
      toast({
        title: 'Update failed',
        description: 'Could not update your profile',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Check for stored user on initial load
  React.useEffect(() => {
    const storedUser = localStorage.getItem('uniaiUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('uniaiUser');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
