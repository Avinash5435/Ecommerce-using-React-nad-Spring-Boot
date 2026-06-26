package com.shop.ecommerce.service;

import com.shop.ecommerce.dto.WishlistItemRequest;
import com.shop.ecommerce.dto.WishlistItemResponse;
import com.shop.ecommerce.entity.Product;
import com.shop.ecommerce.entity.User;
import com.shop.ecommerce.entity.Wishlist;
import com.shop.ecommerce.entity.WishlistItem;
import com.shop.ecommerce.exception.ResourceNotFoundException;
import com.shop.ecommerce.repository.ProductRepository;
import com.shop.ecommerce.repository.UserRepository;
import com.shop.ecommerce.repository.WishlistItemRepository;
import com.shop.ecommerce.repository.WishlistRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final WishlistItemRepository wishlistItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public WishlistService(
            WishlistRepository wishlistRepository,
            WishlistItemRepository wishlistItemRepository,
            UserRepository userRepository,
            ProductRepository productRepository) {
        this.wishlistRepository = wishlistRepository;
        this.wishlistItemRepository = wishlistItemRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @Transactional(readOnly = true)
    public List<WishlistItemResponse> getWishlist(String email) {
        Wishlist wishlist = getOrCreateWishlist(email);
        return wishlist.getItems().stream().map(WishlistItemResponse::new).toList();
    }

    @Transactional
    public List<WishlistItemResponse> addItem(String email, WishlistItemRequest request) {
        Wishlist wishlist = getOrCreateWishlist(email);
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        boolean alreadyPresent = wishlist.getItems().stream()
                .anyMatch(item -> item.getProduct().getId().equals(product.getId()));
        if (!alreadyPresent) {
            WishlistItem item = new WishlistItem();
            item.setWishlist(wishlist);
            item.setProduct(product);
            wishlist.getItems().add(item);
            wishlistRepository.save(wishlist);
        }

        return wishlist.getItems().stream().map(WishlistItemResponse::new).toList();
    }

    @Transactional
    public List<WishlistItemResponse> removeItem(String email, Long productId) {
        Wishlist wishlist = getOrCreateWishlist(email);
        WishlistItem item = wishlistItemRepository.findByWishlistAndProductId(wishlist, productId)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found in wishlist"));

        wishlist.getItems().remove(item);
        wishlistItemRepository.delete(item);

        return wishlist.getItems().stream().map(WishlistItemResponse::new).toList();
    }

    private Wishlist getOrCreateWishlist(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return wishlistRepository.findByUser(user).orElseGet(() -> {
            Wishlist wishlist = new Wishlist();
            wishlist.setUser(user);
            user.setWishlist(wishlist);
            return wishlistRepository.save(wishlist);
        });
    }
}
