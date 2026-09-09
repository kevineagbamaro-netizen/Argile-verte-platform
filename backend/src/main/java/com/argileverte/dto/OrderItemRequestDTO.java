package com.argileverte.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class OrderItemRequestDTO {

    @NotNull(message = "L'identifiant du produit est obligatoire")
    private Long productId;

    private String productName;

    @NotNull(message = "Le prix unitaire est obligatoire")
    private BigDecimal unitPrice;

    @NotNull(message = "La quantité est obligatoire")
    @Min(value = 1, message = "La quantité minimale est 1")
    private Integer quantity;

    public OrderItemRequestDTO() {
    }

    public OrderItemRequestDTO(Long productId, String productName, BigDecimal unitPrice, Integer quantity) {
        this.productId = productId;
        this.productName = productName;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
