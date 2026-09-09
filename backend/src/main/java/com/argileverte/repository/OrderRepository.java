package com.argileverte.repository;

import com.argileverte.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByOrderByCreatedAtDesc();
    Optional<Order> findByOrderNumber(String orderNumber);
    List<Order> findByCustomerPhoneOrderByCreatedAtDesc(String customerPhone);
}
