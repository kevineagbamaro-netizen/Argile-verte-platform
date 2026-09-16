package com.argileverte.service;

import com.argileverte.dto.OrderItemRequestDTO;
import com.argileverte.dto.OrderRequestDTO;
import com.argileverte.exception.ResourceNotFoundException;
import com.argileverte.model.Order;
import com.argileverte.model.OrderItem;
import com.argileverte.model.Product;
import com.argileverte.repository.OrderRepository;
import com.argileverte.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final NotificationService notificationService;

    public OrderService(OrderRepository orderRepository,
                        ProductRepository productRepository,
                        NotificationService notificationService) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.notificationService = notificationService;
    }

    @Transactional(readOnly = true)
    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional(readOnly = true)
    public Order getOrderByNumber(String orderNumber) {
        return orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Commande non trouvée : " + orderNumber));
    }

    public Order createOrder(OrderRequestDTO dto) {
        Order order = new Order();
        order.setCustomerName(dto.getCustomerName());
        order.setCustomerPhone(dto.getCustomerPhone());
        order.setCustomerEmail(dto.getCustomerEmail());
        order.setDeliveryAddress(dto.getDeliveryAddress());
        order.setCity(dto.getCity() != null && !dto.getCity().isBlank() ? dto.getCity() : "Lomé");
        order.setNotes(dto.getNotes());
        order.setPaymentMethod(dto.getPaymentMethod());
        order.setStatus("EN_ATTENTE");

        BigDecimal total = BigDecimal.ZERO;

        for (OrderItemRequestDTO itemDTO : dto.getItems()) {
            Product product = productRepository.findById(itemDTO.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Produit introuvable : " + itemDTO.getProductId()));

            if (!Boolean.TRUE.equals(product.getPublished())) {
                throw new IllegalArgumentException("Le produit « " + product.getName() + " » n'est plus en vente");
            }

            int quantity = itemDTO.getQuantity();
            int stock = product.getStock() != null ? product.getStock() : 0;
            if (stock < quantity) {
                throw new IllegalArgumentException(
                        "Stock insuffisant pour « " + product.getName() + " » (reste " + stock + ")");
            }

            OrderItem item = new OrderItem(
                    product.getId(),
                    product.getName(),
                    product.getPrice(),
                    quantity
            );
            order.addItem(item);
            total = total.add(item.getSubtotal());
            product.setStock(stock - quantity);
            productRepository.save(product);
        }

        order.setTotalAmount(total);
        Order saved = orderRepository.save(order);
        notificationService.notify(
                "COMMANDE",
                "Nouvelle commande " + saved.getOrderNumber(),
                saved.getCustomerName() + " · " + saved.getCity() + " · " + saved.getTotalAmount() + " FCFA",
                "/admin"
        );
        return saved;
    }

    public Order updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Commande non trouvée avec l'id : " + id));
        if (status == null || status.isBlank()) {
            throw new IllegalArgumentException("Le statut est obligatoire");
        }
        order.setStatus(status.trim().toUpperCase());
        return orderRepository.save(order);
    }
}
