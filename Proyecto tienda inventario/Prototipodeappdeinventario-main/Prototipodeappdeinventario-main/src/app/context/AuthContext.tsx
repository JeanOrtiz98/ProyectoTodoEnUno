import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  role: 'admin' | 'empleado';
}

interface AuthContextType {
  user: User | null;
  login: (
      username: string,
      password: string
  ) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (
      username: string,
      password: string
  ): Promise<boolean> => {

    try {

      const response = await fetch(
          'http://localhost:8080/api/users'
      );

      const users = await response.json();

      const foundUser = users.find(
          (u: any) =>
              u.username === username &&
              u.password === password
      );

      if (foundUser) {

        const loggedUser = {
          id: foundUser.id,
          username: foundUser.username,
          role: foundUser.role,
        };

        setUser(loggedUser);

        localStorage.setItem(
            'user',
            JSON.stringify(loggedUser)
        );

        return true;
      }

      return false;

    } catch (error) {

      console.error('Error en login:', error);

      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
      <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
        {children}
      </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
