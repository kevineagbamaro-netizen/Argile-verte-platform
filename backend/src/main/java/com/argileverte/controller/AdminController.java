package com.argileverte.controller;

import com.argileverte.dto.ProductRequestDTO;
import com.argileverte.model.Order;
import com.argileverte.model.Product;
import com.argileverte.model.ShopSettings;
import com.argileverte.service.NotificationService;
import com.argileverte.service.OrderService;
import com.argileverte.service.ProductService;
import com.argileverte.service.SessionService;
import com.argileverte.service.ShopSettingsService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final ProductService productService;
    private final OrderService orderService;
    private final SessionService sessionService;
    private final NotificationService notificationService;
    private final ShopSettingsService shopSettingsService;

    public AdminController(ProductService productService,
                           OrderService orderService,
                           SessionService sessionService,
                           NotificationService notificationService,
                           ShopSettingsService shopSettingsService) {
        this.productService = productService;
        this.orderService = orderService;
        this.sessionService = sessionService;
        this.notificationService = notificationService;
        this.shopSettingsService = shopSettingsService;
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts(
            @RequestHeader(value = "Authorization", required = false) String authorization) {
        sessionService.requireAdmin(authorization);
        return ResponseEntity.ok(productService.getAllProductsForAdmin());
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @PathVariable Long id,
            @Valid @RequestBody ProductRequestDTO dto) {
        sessionService.requireAdmin(authorization);
        return ResponseEntity.ok(productService.updateProduct(id, dto));
    }

    @PatchMapping("/products/{id}/publish")
    public ResponseEntity<Product> publishProduct(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> body) {
        sessionService.requireAdmin(authorization);
        boolean published = Boolean.TRUE.equals(body.get("published"));
        return ResponseEntity.ok(productService.publishProduct(id, published));
    }

    @PatchMapping("/products/{id}/spotlight")
    public ResponseEntity<Product> setSpotlight(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        sessionService.requireAdmin(authorization);
        return ResponseEntity.ok(productService.setSpotlight(id, body.get("spotlight")));
    }

    @PatchMapping("/products/{id}/campaign")
    public ResponseEntity<Product> setCampaign(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        sessionService.requireAdmin(authorization);
        return ResponseEntity.ok(productService.setCampaign(id, body.get("campaign")));
    }

    @GetMapping("/notifications")
    public ResponseEntity<Map<String, Object>> notifications(
            @RequestHeader(value = "Authorization", required = false) String authorization) {
        sessionService.requireAdmin(authorization);
        return ResponseEntity.ok(notificationService.summary());
    }

    @PatchMapping("/notifications/{id}/read")
    public ResponseEntity<Void> markNotificationRead(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @PathVariable Long id) {
        sessionService.requireAdmin(authorization);
        notificationService.markRead(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/notifications/read-all")
    public ResponseEntity<Void> markAllRead(
            @RequestHeader(value = "Authorization", required = false) String authorization) {
        sessionService.requireAdmin(authorization);
        notificationService.markAllRead();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getOrders(
            @RequestHeader(value = "Authorization", required = false) String authorization) {
        sessionService.requireAdmin(authorization);
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PatchMapping("/orders/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        sessionService.requireAdmin(authorization);
        return ResponseEntity.ok(orderService.updateOrderStatus(id, body.get("status")));
    }

    @GetMapping("/shop")
    public ResponseEntity<ShopSettings> getShop(
            @RequestHeader(value = "Authorization", required = false) String authorization) {
        sessionService.requireAdmin(authorization);
        return ResponseEntity.ok(shopSettingsService.ensureExists());
    }

    @PutMapping("/shop")
    public ResponseEntity<ShopSettings> updateShop(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @RequestBody ShopSettings settings) {
        sessionService.requireAdmin(authorization);
        return ResponseEntity.ok(shopSettingsService.save(settings));
    }
}
