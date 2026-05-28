package com.sportstock.api.controller;

import com.sportstock.api.model.User;
import com.sportstock.api.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// ==============================
// CONTROLADOR DE USUARIOS
// Maneja las peticiones HTTP
// ==============================

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    // ==============================
    // SERVICIO DE USUARIO
    // ==============================

    private final UserService userService;

    // ==============================
    // INYECCIÓN DE DEPENDENCIAS
    // ==============================

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ==============================
    // OBTENER TODOS LOS USUARIOS
    // ==============================

    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }

    // ==============================
    // CREAR USUARIO (ADMIN)
    // ==============================

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    // =========================================================
    // CREAR USUARIO DESDE EL LOGIN/ AUTOREGISTRO DE EMPLEADOS
    // =========================================================

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {

        user.setRole("empleado");

        return userService.createUser(user);
    }

    // ==============================
    // ACTUALIZAR PRODUCTO
    // ==============================

    @PutMapping("/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody User user
    ) {
        return userService.updateUser(id, user);
    }

    // ==============================
    // ELIMINAR USUARIO
    // ==============================

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}