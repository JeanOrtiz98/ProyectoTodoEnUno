// ==============================
// IMPORTACIONES API
// ==============================

import { useEffect } from 'react';

import {
  getProducts,
  createProduct,
  updateProduct as updateProductApi,
  deleteProduct as deleteProductApi
} from '../services/productService';
import React, { createContext, useContext, useState } from 'react';

import {
  getUsers,
  createUser as createUserApi,
  updateUserApi,
  deleteUserApi
} from '../services/userService';

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
  password?: string;
  role: 'admin' | 'empleado';
  createdAt: string;
}

interface InventoryContextType {
  products: Product[];
  users: User[];
  currentUser: User;
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

export function InventoryProvider({ children }: { children: React.ReactNode }) {

  // ==============================
  // ESTADO DE PRODUCTOS
  // ==============================

  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser] = useState<User>({
    id: 1,
    username: 'admin',
    email: 'admin@deportes.com',
    role: 'admin',
    createdAt: '2026-01-01',
  });

// ==============================
// CARGAR PRODUCTOS DESDE API
// ==============================

  useEffect(() => {

    loadProducts();
    loadUsers();

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

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error(
          "Error cargando usuarios:",
          error
      );
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

  const addUser = async (
      user: Omit<User, 'id' | 'createdAt'>
  ) => {
    try {
      const newUser = await createUserApi(user);
      setUsers([...users, newUser]);
    } catch (error) {
      console.error(
          "Error creando usuario:",
          error
      );
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

  const updateUser = async (
      id: number,
      userUpdate: Partial<User>
  ) => {
    try {
      const existingUser = users.find(
          u => u.id === id
      );
      if (!existingUser) return;
      const updatedUser = {
        ...existingUser,
        ...userUpdate,
      };
      const result = await updateUserApi(
          id,
          updatedUser
      );
      setUsers(
          users.map(u =>
              u.id === id ? result : u
          )
      );
    } catch (error) {
      console.error(
          "Error actualizando usuario:",
          error
      );
    }
  };

// ==============================
// ELIMINAR PRODUCTO
// ==============================

  const deleteProduct = async (id: number) => {
    try {
      await deleteProductApi(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  const deleteUser = async (
      id: number
  ) => {
    try {
      await deleteUserApi(id);
      setUsers(
          users.filter(u => u.id !== id)
      );
    } catch (error) {
      console.error(
          "Error eliminando usuario:",
          error
      );
    }
  };
// ==============================
// OBTENER PRODUCTO POR ID
// ==============================

  const getProduct = (id: number) => {
    return products.find(p => p.id === id);
  };

  return (
    <InventoryContext.Provider
        value={{
          products,
          users,
          currentUser,
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
