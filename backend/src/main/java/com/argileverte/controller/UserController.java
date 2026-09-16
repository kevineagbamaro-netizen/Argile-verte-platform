package com.argileverte.controller;

import com.argileverte.model.User;
import com.argileverte.service.SessionService;
import com.argileverte.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final SessionService sessionService;

    public UserController(UserService userService, SessionService sessionService) {
        this.userService = userService;
        this.sessionService = sessionService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(
            @RequestHeader(value = "Authorization", required = false) String authorization) {
        sessionService.requireAdmin(authorization);
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @PathVariable Long id) {
        sessionService.requireAdmin(authorization);
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createUser(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @Valid @RequestBody User user) {
        sessionService.requireAdmin(authorization);
        try {
            User created = userService.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @PathVariable Long id) {
        sessionService.requireAdmin(authorization);
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
