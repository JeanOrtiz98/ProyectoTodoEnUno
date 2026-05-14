// ==============================
// URL BASE DE LA API
// ==============================

const API_URL = "http://localhost:8080/api/products";

// ==============================
// INTERFAZ PRODUCT
// ==============================

export interface Product {
    id?: number;
    name: string;
    description: string;
    category: string;
    quantity: number;
    price: number;
    status: 'disponible' | 'bajo stock' | 'agotado';
}

// ==============================
// OBTENER PRODUCTOS
// ==============================

export const getProducts = async (): Promise<Product[]> => {

    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Error al obtener productos");
    }

    return response.json();
};

// ==============================
// CREAR PRODUCTO
// ==============================

export const createProduct = async (product: Product) => {

    const response = await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error("Error al crear producto");
    }

    return response.json();
};

// ==============================
// ELIMINAR PRODUCTO
// ==============================

export const deleteProductApi = async (id: string) => {

    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Error al eliminar producto");
    }
};