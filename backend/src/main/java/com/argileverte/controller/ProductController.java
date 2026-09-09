package com.argileverte.controller;

import com.argileverte.dto.ProductRequestDTO;
import com.argileverte.model.Product;
import com.argileverte.model.Review;
import com.argileverte.service.ProductService;
import com.argileverte.service.ReviewService;
import com.argileverte.dto.ReviewRequestDTO;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final ReviewService reviewService;

    public ProductController(ProductService productService, ReviewService reviewService) {
        this.productService = productService;
        this.reviewService = reviewService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean featured) {

        if (search != null && !search.trim().isEmpty()) {
            return ResponseEntity.ok(productService.searchProducts(search.trim()));
        }
        if (category != null && !category.trim().isEmpty()) {
            return ResponseEntity.ok(productService.getProductsByCategory(category.trim()));
        }
        if (Boolean.TRUE.equals(featured)) {
            return ResponseEntity.ok(productService.getFeaturedProducts());
        }
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@Valid @RequestBody ProductRequestDTO dto) {
        Product created = productService.createProduct(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductRequestDTO dto) {
        Product updated = productService.updateProduct(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    // Avis clients
    @GetMapping("/{id}/reviews")
    public ResponseEntity<List<Review>> getReviews(@PathVariable Long id) {
        return ResponseEntity.ok(reviewService.getReviewsByProduct(id));
    }

    @PostMapping("/{id}/reviews")
    public ResponseEntity<Review> addReview(@PathVariable Long id, @Valid @RequestBody ReviewRequestDTO dto) {
        Review review = reviewService.addReview(id, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(review);
    }
}
