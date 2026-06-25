package com.shop.ecommerce.controller;

import com.shop.ecommerce.dto.ProductResponse;
import com.shop.ecommerce.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public List<ProductResponse> getProducts(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String category) {

        if (category != null && !category.isBlank()) {
            return productService.getProductsByCategory(category);
        }
        if (q != null && !q.isBlank()) {
            return productService.searchProducts(q);
        }
        return productService.getAllProducts();
    }

    @GetMapping("/products/{id}")
    public ProductResponse getProduct(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @GetMapping("/categories")
    public List<String> getCategories() {
        return productService.getCategories();
    }
}
