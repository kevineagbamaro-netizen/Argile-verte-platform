package com.argileverte.controller;

import com.argileverte.dto.OrderRequestDTO;
import com.argileverte.model.Order;
import com.argileverte.service.OrderService;
import com.argileverte.service.SessionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final SessionService sessionService;

    public OrderController(OrderService orderService, SessionService sessionService) {
        this.orderService = orderService;
        this.sessionService = sessionService;
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestHeader(value = "Authorization", required = false) String authorization,
                                             @Valid @RequestBody OrderRequestDTO dto) {
        sessionService.requireUser(authorization);
        Order order = orderService.createOrder(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    @GetMapping("/{orderNumber}")
    public ResponseEntity<Order> getOrderByNumber(@PathVariable String orderNumber) {
        return ResponseEntity.ok(orderService.getOrderByNumber(orderNumber));
    }
}
