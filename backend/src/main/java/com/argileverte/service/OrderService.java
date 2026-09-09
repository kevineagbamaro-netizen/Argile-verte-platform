package com.argileverte.service;

import com.argileverte.dto.OrderItemRequestDTO;
import com.argileverte.dto.OrderRequestDTO;
import com.argileverte.exception.ResourceNotFoundException;
import com.argileverte.model.Order;
import com.argileverte.model.OrderItem;
import com.argileverte.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
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
        order.setCity(dto.getCity());
        order.setNotes(dto.getNotes());
        order.setPaymentMethod(dto.getPaymentMethod());
        order.setTotalAmount(dto.getTotalAmount());
        order.setStatus("EN_ATTENTE");

        for (OrderItemRequestDTO itemDTO : dto.getItems()) {
            OrderItem item = new OrderItem(
                    itemDTO.getProductId(),
                    itemDTO.getProductName(),
                    itemDTO.getUnitPrice(),
                    itemDTO.getQuantity()
            );
            order.addItem(item);
        }

        return orderRepository.save(order);
    }

    public Order updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Commande non trouvée avec l'id : " + id));
        order.setStatus(status);
        return orderRepository.save(order);
    }
}
