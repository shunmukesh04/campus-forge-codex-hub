
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, AuthContextType, UserRole } from '@/types/auth';
import { toast } from "@/components/ui/use-toast";

// Mock user data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Student',
    email: 'student@example.com',
    role: 'student',
    avatar: '/placeholder.svg',
    department: 'Computer Science',
    studentId: 'CS2023001',
    batch: '2023-2027',
    semester: 3
  },
  {
    id: '2',
    name: 'Jane Faculty',
    email: 'faculty@example.com',
    role: 'faculty',
    avatar: '/placeholder.svg',
    department: 'Computer Science',
    facultyId: 'CSF001'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: '/placeholder.svg'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('campusBridgeUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('campusBridgeUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll use our mock data
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser && password === 'password') { // Simple password check for demo
        setUser(foundUser);
        localStorage.setItem('campusBridgeUser', JSON.stringify(foundUser));
        toast({
          title: "Login successful",
          description: `Welcome back, ${foundUser.name}!`,
        });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('campusBridgeUser');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const signUp = async (userData: Partial<User>, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate server validation
      if (!userData.email || !userData.name || !userData.role || !password) {
        throw new Error('Missing required fields');
      }
      
      // Check if email already exists
      if (mockUsers.some(u => u.email === userData.email)) {
        throw new Error('Email already registered');
      }

      // In a real app, this would be an API call to create a user
      const newUser: User = {
        id: `${mockUsers.length + 1}`,
        name: userData.name,
        email: userData.email as string,
        role: userData.role as UserRole,
        avatar: '/placeholder.svg',
        ...userData
      };

      // Normally, we'd add the user to our database here
      // For the demo, we're just setting the current user
      setUser(newUser);
      localStorage.setItem('campusBridgeUser', JSON.stringify(newUser));
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully",
      });
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        signUp
      }}
    >
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
