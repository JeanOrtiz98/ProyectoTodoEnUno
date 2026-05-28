package com.sportstock.api.service;

import com.sportstock.api.model.User;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final List<User> users = new ArrayList<>();

    public UserService() {

        users.add(new User(
                1L,
                "admin",
                "admin@sportstock.com",
                "admin123",
                "admin",
                LocalDate.now()
        ));

        users.add(new User(
                2L,
                "empleado",
                "empleado@sportstock.com",
                "empleado123",
                "empleado",
                LocalDate.now()
        ));
        users.add(new User(
                3L,
                "Jean",
                "admin@sportstock.com",
                "1234",
                "admin",
                LocalDate.now()
        ));
    }

    public List<User> getUsers() {
        return users;
    }

    public User createUser(User user) {

        user.setId((long) (users.size() + 1));
        user.setCreatedAt(LocalDate.now());

        users.add(user);

        System.out.println(users);

        return user;
    }

    public User updateUser(Long id, User updatedUser) {

        for (User user : users) {

            if (user.getId().equals(id)) {

                user.setUsername(updatedUser.getUsername());
                user.setEmail(updatedUser.getEmail());
                user.setPassword(updatedUser.getPassword());
                user.setRole(updatedUser.getRole());

                return user;
            }
        }

        return null;
    }

    public void deleteUser(Long id) {

        users.removeIf(user -> user.getId().equals(id));
    }
}