package com.shop.ecommerce.config;

import com.shop.ecommerce.entity.Product;
import com.shop.ecommerce.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedProducts(ProductRepository productRepository) {
        return args -> {
            if (productRepository.count() > 0) {
                return;
            }

            List<Product> products = List.of(
                    createProduct(
                            "Wireless Noise-Cancelling Headphones",
                            "Premium over-ear headphones with 30-hour battery life, active noise cancellation, and studio-quality sound.",
                            "129.99",
                            "Electronics",
                            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
                            50),
                    createProduct(
                            "Smart Watch Pro",
                            "Track fitness, heart rate, sleep, and receive notifications on your wrist with a vibrant AMOLED display.",
                            "249.99",
                            "Electronics",
                            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
                            35),
                    createProduct(
                            "Minimalist Leather Backpack",
                            "Handcrafted full-grain leather backpack with laptop compartment and water-resistant lining.",
                            "89.99",
                            "Fashion",
                            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
                            40),
                    createProduct(
                            "Running Shoes Ultra",
                            "Lightweight performance running shoes with responsive cushioning and breathable mesh upper.",
                            "119.99",
                            "Sports",
                            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
                            60),
                    createProduct(
                            "Ceramic Coffee Mug Set",
                            "Set of 4 artisan ceramic mugs with matte finish, microwave and dishwasher safe.",
                            "34.99",
                            "Home",
                            "https://images.unsplash.com/photo-1514228742587-6b1558fcca03?w=600",
                            100),
                    createProduct(
                            "Organic Skincare Bundle",
                            "Complete skincare set with cleanser, toner, serum, and moisturizer made from organic ingredients.",
                            "59.99",
                            "Beauty",
                            "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600",
                            45),
                    createProduct(
                            "Mechanical Keyboard RGB",
                            "Compact 75% mechanical keyboard with hot-swappable switches and per-key RGB lighting.",
                            "149.99",
                            "Electronics",
                            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600",
                            25),
                    createProduct(
                            "Yoga Mat Premium",
                            "Extra thick non-slip yoga mat with alignment lines, includes carrying strap.",
                            "39.99",
                            "Sports",
                            "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600",
                            80),
                    createProduct(
                            "Denim Jacket Classic",
                            "Timeless medium-wash denim jacket with button closure and chest pockets.",
                            "69.99",
                            "Fashion",
                            "https://images.unsplash.com/photo-1576995856233-8976e1c0a0a0?w=600",
                            30),
                    createProduct(
                            "Scented Candle Collection",
                            "Set of 3 soy wax candles in lavender, vanilla, and sandalwood scents. 40-hour burn time each.",
                            "29.99",
                            "Home",
                            "https://images.unsplash.com/photo-1602607175241-e3a2933042c5?w=600",
                            55),
                    createProduct(
                            "Portable Bluetooth Speaker",
                            "Waterproof speaker with 360° sound, 12-hour battery, and built-in microphone.",
                            "79.99",
                            "Electronics",
                            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
                            42),
                    createProduct(
                            "Stainless Steel Water Bottle",
                            "Insulated 32oz bottle keeps drinks cold 24hrs or hot 12hrs. BPA-free.",
                            "24.99",
                            "Sports",
                            "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600",
                            120)
            );

            productRepository.saveAll(products);
        };
    }

    private Product createProduct(
            String name, String description, String price, String category, String imageUrl, int stock) {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(new BigDecimal(price));
        product.setCategory(category);
        product.setImageUrl(imageUrl);
        product.setStock(stock);
        return product;
    }
}
