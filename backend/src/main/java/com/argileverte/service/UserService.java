package com.argileverte.service;

import com.argileverte.dto.AuthResponse;
import com.argileverte.dto.LoginRequest;
import com.argileverte.dto.RegisterRequest;
import com.argileverte.exception.ResourceNotFoundException;
import com.argileverte.model.Role;
import com.argileverte.model.User;
import com.argileverte.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public UserService(UserRepository userRepository, NotificationService notificationService) {
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Email ou mot de passe incorrect"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new IllegalArgumentException("Email ou mot de passe incorrect");
        }

        String token = "session-" + user.getId() + "-" + System.currentTimeMillis();

        return new AuthResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getAddress(),
                user.getRole(),
                token
        );
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Un compte existe déjà avec cet email : " + request.getEmail());
        }

        User user = new User(
                request.getEmail(),
                request.getPassword(),
                request.getName(),
                request.getPhone(),
                request.getAddress(),
                Role.ROLE_USER
        );

        user = userRepository.save(user);
        notificationService.notify(
                "CLIENT",
                "Nouveau client",
                user.getName() + " (" + user.getEmail() + ") vient de créer un compte",
                "/admin"
        );

        String token = "session-" + user.getId() + "-" + System.currentTimeMillis();

        return new AuthResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getAddress(),
                user.getRole(),
                token
        );
    }

    public User createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Cet email est déjà utilisé : " + user.getEmail());
        }
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Utilisateur non trouvé avec l'id : " + id);
        }
        userRepository.deleteById(id);
    }
}
