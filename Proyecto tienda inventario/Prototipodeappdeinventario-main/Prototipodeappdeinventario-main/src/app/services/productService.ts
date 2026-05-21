const API_URL = "http://localhost:8080/api/products";

// Obtener todos los productos
export const getProducts = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Error al obtener productos");
    }

    return response.json();
};

// Crear producto
export const createProduct = async (product: any) => {
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

// Actualizar producto
export const updateProduct = async (id: number, product: any) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error("Error al actualizar producto");
    }

    return response.json();
};

// Eliminar producto
export const deleteProduct = async (id: number) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Error al eliminar producto");
    }
};