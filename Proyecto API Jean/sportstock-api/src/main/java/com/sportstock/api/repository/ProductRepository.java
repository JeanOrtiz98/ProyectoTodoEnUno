package com.sportstock.api.repository;

// ==============================
// IMPORTACIONES
// ==============================

import com.sportstock.api.model.Product;
import org.springframework.stereotype.Repository;

import java.util.*;

// ==============================
// REPOSITORIO EN MEMORIA
// Simula una base de datos
// ==============================

@Repository
public class ProductRepository {

    // ==============================
    // ALMACENAMIENTO DE PRODUCTOS
    // ==============================

    private final Map<Long, Product> products = new HashMap<>();

    // ==============================
    // CONTADOR AUTOMÁTICO DE IDS
    // ==============================

    private Long currentId = 1L;

    // ==============================
    // OBTENER TODOS LOS PRODUCTOS
    // ==============================

    public List<Product> findAll() {
        return new ArrayList<>(products.values());
    }

    // ==============================
    // BUSCAR PRODUCTO POR ID
    // ==============================

    public Optional<Product> findById(Long id) {
        return Optional.ofNullable(products.get(id));
    }

    // ==============================
    // GUARDAR PRODUCTO
    // ==============================

    public Product save(Product product) {

        // Si el producto no tiene ID
        // se genera automáticamente

        if (product.getId() == null) {
            product.setId(currentId++);
        }

        products.put(product.getId(), product);

        return product;
    }
    // ==============================
    // ELIMINAR PRODUCTO
    // ==============================

    public void deleteById(Long id) {
        products.remove(id);
    }
}
