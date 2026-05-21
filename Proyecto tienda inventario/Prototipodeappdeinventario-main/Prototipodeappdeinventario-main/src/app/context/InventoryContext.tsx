// ==============================
// IMPORTACIONES API
// ==============================

import { useEffect } from 'react';

import {
  getProducts,
  createProduct,
  updateProduct as updateProductApi,
  deleteProduct
} from '../services/productService';
import React, { createContext, useContext, useState } from 'react';

export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  quantity: number;
  price: number;
  status: 'disponible' | 'bajo stock' | 'agotado';
  image?: string;
  movements?: Movement[];
}

export interface Movement {
  id: number;
  type: 'entrada' | 'salida';
  quantity: number;
  date: string;
  user: string;
  notes?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'empleado';
  createdAt: string;
}

interface InventoryContextType {
  products: Product[];
  users: User[];
  addProduct: (
      product: Omit<Product, 'id' | 'status' | 'movements'>
  ) => void;
  updateProduct: (
      id: number,
      product: Partial<Product>
  ) => void;
  deleteProduct: (
      id: number
  ) => void;
  getProduct: (
      id: number
  ) => Product | undefined;
  addUser: (
      user: Omit<User, 'id' | 'createdAt'>
  ) => void;
  updateUser: (
      id: number,
      user: Partial<User>
  ) => void;
  deleteUser: (
      id: number
  ) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// Datos iniciales mock
const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Balón de Fútbol Nike',
    category: 'Fútbol',
    description: 'Balón oficial de competición',
    quantity: 45,
    price: 29.99,
    status: 'disponible',
    movements: [
      { id: 1, type: 'entrada', quantity: 50, date: '2026-03-10', user: 'admin', notes: 'Pedido inicial' },
      { id: 2, type: 'salida', quantity: 5, date: '2026-03-15', user: 'empleado', notes: 'Venta local' },
    ]
  },
  {
    id: 2,
    name: 'Raqueta de Tenis Wilson',
    category: 'Tenis',
    description: 'Raqueta profesional de grafito',
    quantity: 8,
    price: 149.99,
    status: 'bajo stock',
    movements: [
      { id: 3, type: 'entrada', quantity: 20, date: '2026-02-20', user: 'admin' },
      { id: 4, type: 'salida', quantity: 12, date: '2026-03-12', user: 'empleado' },
    ]
  },
  {
    id: 3,
    name: 'Zapatillas Running Adidas',
    category: 'Running',
    description: 'Zapatillas con tecnología Boost',
    quantity: 32,
    price: 119.99,
    status: 'disponible',
  },
  {
    id: 4,
    name: 'Pelota de Básquetbol Spalding',
    category: 'Básquetbol',
    description: 'Pelota oficial NBA',
    quantity: 0,
    price: 49.99,
    status: 'agotado',
  },
  {
    id: 5,
    name: 'Guantes de Boxeo Everlast',
    category: 'Boxeo',
    description: 'Guantes profesionales 12 oz',
    quantity: 15,
    price: 79.99,
    status: 'disponible',
  },
  {
    id: 6,
    name: 'Bicicleta de Montaña Trek',
    category: 'Ciclismo',
    description: 'Mountain bike profesional',
    quantity: 5,
    price: 899.99,
    status: 'bajo stock',
  },
];

const initialUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@deportes.com',
    role: 'admin',
    createdAt: '2026-01-15',
  },
  {
    id: 2,
    username: 'empleado',
    email: 'empleado@deportes.com',
    role: 'empleado',
    createdAt: '2026-02-01',
  },
  {
    id: 3,
    username: 'carlos.gomez',
    email: 'carlos@deportes.com',
    role: 'empleado',
    createdAt: '2026-02-10',
  },
];

export function InventoryProvider({ children }: { children: React.ReactNode }) {
  // ESTADO DE PRODUCTOS
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>(initialUsers);

// ==============================
// CARGAR PRODUCTOS DESDE API
// ==============================

  useEffect(() => {

    loadProducts();

  }, []);

// ==============================
// OBTENER PRODUCTOS
// ==============================

  const loadProducts = async () => {

    try {

      const data = await getProducts();

      setProducts(data);

    } catch (error) {

      console.error("Error cargando productos:", error);
    }
  };

// ==============================
// AGREGAR PRODUCTO
// ==============================

  const addProduct = async (
      product: Omit<Product, 'id' | 'status' | 'movements'>
  ) => {
    try {
      const status =
          product.quantity === 0
              ? 'agotado'
              : product.quantity < 10
                  ? 'bajo stock'
                  : 'disponible';

      const newProduct = await createProduct({
        ...product,
        status,
      });

      setProducts([...products, newProduct]);

    } catch (error) {

      console.error("Error creando producto:", error);
    }
  };

// ==============================
// ACTUALIZAR PRODUCTO
// ==============================

  const updateProduct = async (
      id: number,
      productUpdate: Partial<Product>
  ) => {

    try {

      const existingProduct = products.find(p => p.id === id);

      if (!existingProduct) return;

      const updatedProduct = {
        ...existingProduct,
        ...productUpdate,
      };

      updatedProduct.status =
          updatedProduct.quantity === 0
              ? 'agotado'
              : updatedProduct.quantity < 10
                  ? 'bajo stock'
                  : 'disponible';

      const result = await updateProductApi(
          Number(id),
          updatedProduct
      );

      setProducts(products.map(p =>
          p.id === id ? result : p
      ));

    } catch (error) {

      console.error("Error actualizando producto:", error);
    }
  };

// ==============================
// ELIMINAR PRODUCTO
// ==============================

  const deleteProduct = async (id: number) => {

    try {

      await deleteProduct(id);

      setProducts(products.filter(p => p.id !== id));

    } catch (error) {

      console.error("Error eliminando producto:", error);
    }
  };

// ==============================
// OBTENER PRODUCTO POR ID
// ==============================

  const getProduct = (id: number) => {
    return products.find(p => p.id === id);
  };

  const addUser = (user: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...user,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUsers([...users, newUser]);
  };

  const updateUser = (id: number, userUpdate: Partial<User>) => {
    setUsers(users.map(u => (u.id === id ? { ...u, ...userUpdate } : u)));
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <InventoryContext.Provider
      value={{
        products,
        users,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
        addUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
}
