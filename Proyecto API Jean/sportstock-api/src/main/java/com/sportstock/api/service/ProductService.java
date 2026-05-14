package com.sportstock.api.service;

// ==============================
// IMPORTACIONES
// ==============================

import com.sportstock.api.model.Product;
import com.sportstock.api.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

// ==============================
// SERVICIO DE PRODUCTOS
// Contiene la lógica de negocio
// ==============================

@Service
public class ProductService {

    // ==============================
    // REPOSITORIO
    // ==============================

    private final ProductRepository productRepository;


    // ==============================
    // INYECCIÓN DE DEPENDENCIAS
    // ==============================

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // ==============================
    // OBTENER TODOS LOS PRODUCTOS
    // ==============================

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // ==============================
    // OBTENER PRODUCTO POR ID
    // ==============================

    public Product getProductById(Long id) {

        return productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Producto no encontrado"));
    }

    // ==============================
    // CREAR PRODUCTO
    // ==============================

    public Product createProduct(Product product) {

        // Validación básica

        if (product.getName() == null || product.getName().isBlank()) {
            throw new RuntimeException("El nombre es obligatorio");
        }

        return productRepository.save(product);
    }

    // ==============================
    // ACTUALIZAR PRODUCTO
    // ==============================

    public Product updateProduct(Long id, Product updatedProduct) {

        Product existingProduct = getProductById(id);

        existingProduct.setName(updatedProduct.getName());
        existingProduct.setCategory(updatedProduct.getCategory());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setQuantity(updatedProduct.getQuantity());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setStatus(updatedProduct.getStatus());

        return productRepository.save(existingProduct);
    }

    // ==============================
    // ELIMINAR PRODUCTO
    // ==============================

    public void deleteProduct(Long id) {

        getProductById(id);

        productRepository.deleteById(id);
    }
}