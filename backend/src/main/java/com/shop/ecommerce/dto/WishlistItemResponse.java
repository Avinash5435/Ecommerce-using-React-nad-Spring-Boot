package com.shop.ecommerce.dto;

import com.shop.ecommerce.entity.WishlistItem;

import java.math.BigDecimal;

public class WishlistItemResponse {

    private Long productId;
    private String name;
    private String category;
    private String imageUrl;
    private BigDecimal price;

    public WishlistItemResponse() {
    }

    public WishlistItemResponse(WishlistItem item) {
        this.productId = item.getProduct().getId();
        this.name = item.getProduct().getName();
        this.category = item.getProduct().getCategory();
        this.imageUrl = item.getProduct().getImageUrl();
        this.price = item.getProduct().getPrice();
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
