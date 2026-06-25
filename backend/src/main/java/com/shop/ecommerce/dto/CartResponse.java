package com.shop.ecommerce.dto;

import com.shop.ecommerce.entity.Cart;
import java.math.BigDecimal;
import java.util.List;

public class CartResponse {

    private Long id;
    private List<CartItemResponse> items;
    private BigDecimal total;
    private int itemCount;

    public CartResponse() {
    }

    public CartResponse(Cart cart) {
        this.id = cart.getId();
        this.items = cart.getItems().stream().map(CartItemResponse::new).toList();
        this.total = items.stream()
                .map(CartItemResponse::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        this.itemCount = items.stream().mapToInt(CartItemResponse::getQuantity).sum();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<CartItemResponse> getItems() {
        return items;
    }

    public void setItems(List<CartItemResponse> items) {
        this.items = items;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public int getItemCount() {
        return itemCount;
    }

    public void setItemCount(int itemCount) {
        this.itemCount = itemCount;
    }
}
