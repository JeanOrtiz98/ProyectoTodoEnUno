package com.sportstock.api.model;

// ==============================
// MODELO PRODUCT
// ==============================

public class Product {

    // ==============================
    // ATRIBUTOS
    // ==============================

    private Long id;
    private String name;
    private String description;
    private String category;
    private Double price;
    private Integer quantity;
    private String status;

    // ==============================
    // CONSTRUCTOR VACÍO
    // ==============================

    public Product() {
    }

    // ==============================
    // CONSTRUCTOR COMPLETO
    // ==============================

    public Product(
            Long id,
            String name,
            String description,
            String category,
            Double price,
            Integer quantity,
            String status
    ) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
        this.status = status;
    }

    // ==============================
    // GETTERS Y SETTERS
    // ==============================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}