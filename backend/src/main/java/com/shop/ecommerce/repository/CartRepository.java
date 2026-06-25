package com.shop.ecommerce.repository;

import com.shop.ecommerce.entity.Cart;
import com.shop.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
}
