package com.sportstock.api.config;

// ==============================
// IMPORTACIONES
// ==============================

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// ==============================
// CONFIGURACIÓN CORS
// Permite conexión con React
// ==============================

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(CorsRegistry registry) {

                registry.addMapping("/**")

                        // Frontend React/Vite

                        .allowedOrigins("http://localhost:5173")

                        // Métodos permitidos

                        .allowedMethods(
                                "GET",
                                "POST",
                                "PUT",
                                "DELETE"
                        )

                        // Permitir cualquier header


                        .allowedHeaders("*");
            }
        };
    }
}