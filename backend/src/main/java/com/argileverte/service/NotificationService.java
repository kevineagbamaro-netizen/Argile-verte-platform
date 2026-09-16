package com.argileverte.service;

import com.argileverte.exception.ResourceNotFoundException;
import com.argileverte.model.AdminNotification;
import com.argileverte.repository.AdminNotificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class NotificationService {

    private final AdminNotificationRepository repository;

    public NotificationService(AdminNotificationRepository repository) {
        this.repository = repository;
    }

    public void notify(String type, String title, String message, String link) {
        repository.save(new AdminNotification(type, title, message, link));
    }

    @Transactional(readOnly = true)
    public List<AdminNotification> list() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional(readOnly = true)
    public Map<String, Object> summary() {
        return Map.of(
                "unread", repository.countByReadFlagFalse(),
                "items", repository.findAllByOrderByCreatedAtDesc()
        );
    }

    public AdminNotification markRead(Long id) {
        AdminNotification notification = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification introuvable"));
        notification.setReadFlag(true);
        return repository.save(notification);
    }

    public void markAllRead() {
        repository.findAllByOrderByCreatedAtDesc().forEach(item -> {
            item.setReadFlag(true);
            repository.save(item);
        });
    }
}
