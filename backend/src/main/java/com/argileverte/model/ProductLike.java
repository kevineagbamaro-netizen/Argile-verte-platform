package com.argileverte.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "product_likes",
        uniqueConstraints = @UniqueConstraint(columnNames = {"product_id", "client_key"})
)
public class ProductLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "client_key", nullable = false, length = 80)
    private String clientKey;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public ProductLike() {
        this.createdAt = LocalDateTime.now();
    }

    public ProductLike(Product product, String clientKey) {
        this.product = product;
        this.clientKey = clientKey;
        this.createdAt = LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    public Long getId() {
        return id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public String getClientKey() {
        return clientKey;
    }

    public void setClientKey(String clientKey) {
        this.clientKey = clientKey;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
