package com.sportstock.api.controller;

// ==============================
// IMPORTACIONES
// ==============================

import com.sportstock.api.model.Product;
import com.sportstock.api.service.ProductService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

// ==============================
// CONTROLADOR DE PRODUCTOS
// Maneja las peticiones HTTP
// ==============================

@RestController

@RequestMapping("/api/products")

public class ProductController {

    // ==============================
    // SERVICIO DE PRODUCTOS
    // ==============================

    private final ProductService productService;

    // ==============================
    // INYECCIÓN DE DEPENDENCIAS
    // ==============================

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // ==============================
    // OBTENER TODOS LOS PRODUCTOS
    // GET /api/products
    // ==============================

    @GetMapping
    public List<Product> getAllProducts() {

        return productService.getAllProducts();
    }

    // ==============================
    // OBTENER PRODUCTO POR ID
    // GET /api/products/{id}
    // ==============================

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {

        return productService.getProductById(id);
    }

    // ==============================
    // CREAR PRODUCTO
    // POST /api/products
    // ==============================

    @PostMapping
    public Product createProduct(@RequestBody Product product) {

        return productService.createProduct(product);
    }

    // ==============================
    // ACTUALIZAR PRODUCTO
    // PUT /api/products/{id}
    // ==============================

    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody Product product
    ) {

        return productService.updateProduct(id, product);
    }

    // ==============================
    // ELIMINAR PRODUCTO
    // DELETE /api/products/{id}
    // ==============================

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {

        productService.deleteProduct(id);
    }
}