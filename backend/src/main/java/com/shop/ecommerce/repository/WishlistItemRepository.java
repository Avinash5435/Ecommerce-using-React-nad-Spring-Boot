package com.shop.ecommerce.repository;

import com.shop.ecommerce.entity.Wishlist;
import com.shop.ecommerce.entity.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {
    Optional<WishlistItem> findByWishlistAndProductId(Wishlist wishlist, Long productId);
    void deleteByWishlistAndProductId(Wishlist wishlist, Long productId);
}
