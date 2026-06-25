package com.shop.ecommerce.dto;

import com.shop.ecommerce.entity.Order;
import com.shop.ecommerce.entity.OrderItem;
import com.shop.ecommerce.entity.OrderStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderItemResponse {

    private Long productId;
    private String productName;
    private BigDecimal unitPrice;
    private int quantity;

    public OrderItemResponse() {
    }

    public OrderItemResponse(OrderItem item) {
        this.productId = item.getProductId();
        this.productName = item.getProductName();
        this.unitPrice = item.getUnitPrice();
        this.quantity = item.getQuantity();
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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
