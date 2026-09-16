package com.argileverte.service;

import com.argileverte.exception.ForbiddenException;
import com.argileverte.model.Role;
import com.argileverte.model.User;
import com.argileverte.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SessionService {

    private final UserRepository userRepository;

    public SessionService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> fromAuthorization(String authorization) {
        if (authorization == null || authorization.isBlank()) {
            return Optional.empty();
        }
        String token = authorization.startsWith("Bearer ")
                ? authorization.substring(7).trim()
                : authorization.trim();
        String[] parts = token.split("-");
        if (parts.length < 2 || !"session".equals(parts[0])) {
            return Optional.empty();
        }
        try {
            Long userId = Long.parseLong(parts[1]);
            return userRepository.findById(userId);
        } catch (NumberFormatException ex) {
            return Optional.empty();
        }
    }

    public User requireAdmin(String authorization) {
        User user = fromAuthorization(authorization)
                .orElseThrow(() -> new ForbiddenException("Connexion administrateur requise"));
        if (user.getRole() != Role.ROLE_ADMIN) {
            throw new ForbiddenException("Cette action est réservée à l'administrateur Argile Verte");
        }
        return user;
    }

    public User requireUser(String authorization) {
        return fromAuthorization(authorization)
                .orElseThrow(() -> new ForbiddenException("Créez un compte ou connectez-vous pour continuer"));
    }
}
