package com.shop.ecommerce.controller;

import com.shop.ecommerce.dto.WishlistItemRequest;
import com.shop.ecommerce.dto.WishlistItemResponse;
import com.shop.ecommerce.service.WishlistService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping
    public List<WishlistItemResponse> getWishlist(@AuthenticationPrincipal UserDetails userDetails) {
        return wishlistService.getWishlist(userDetails.getUsername());
    }

    @PostMapping("/items")
    public List<WishlistItemResponse> addItem(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody WishlistItemRequest request) {
        return wishlistService.addItem(userDetails.getUsername(), request);
    }

    @DeleteMapping("/items/{productId}")
    public List<WishlistItemResponse> removeItem(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long productId) {
        return wishlistService.removeItem(userDetails.getUsername(), productId);
    }
}
