package com.sportstock.api.controller;

// ==============================
// IMPORTACIONES
// ==============================

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// ==============================
// CONTROLADOR PRINCIPAL
// ==============================

@RestController
@RequestMapping("/api")
public class HealthController {

    // ==============================
    // ENDPOINT DE PRUEBA
    // ==============================

    @GetMapping("/health")
    public String health() {
        return "SportStock API funcionando correctamente 🚀";
    }
}
