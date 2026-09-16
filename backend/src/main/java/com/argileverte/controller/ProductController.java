package com.argileverte.controller;

import com.argileverte.dto.LikeRequestDTO;
import com.argileverte.dto.LikeResponseDTO;
import com.argileverte.dto.ProductRequestDTO;
import com.argileverte.dto.ReviewRequestDTO;
import com.argileverte.model.Product;
import com.argileverte.model.Review;
import com.argileverte.service.LikeService;
import com.argileverte.service.ProductService;
import com.argileverte.service.ReviewService;
import com.argileverte.service.SessionService;
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
    private final LikeService likeService;
    private final SessionService sessionService;

    public ProductController(ProductService productService,
                             ReviewService reviewService,
                             LikeService likeService,
                             SessionService sessionService) {
        this.productService = productService;
        this.reviewService = reviewService;
        this.likeService = likeService;
        this.sessionService = sessionService;
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
        return ResponseEntity.ok(productService.getPublishedProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productService.getPublishedProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestHeader(value = "Authorization", required = false) String authorization,
                                                 @Valid @RequestBody ProductRequestDTO dto) {
        sessionService.requireAdmin(authorization);
        Product created = productService.createProduct(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@RequestHeader(value = "Authorization", required = false) String authorization,
                                                 @PathVariable Long id,
                                                 @Valid @RequestBody ProductRequestDTO dto) {
        sessionService.requireAdmin(authorization);
        Product updated = productService.updateProduct(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@RequestHeader(value = "Authorization", required = false) String authorization,
                                              @PathVariable Long id) {
        sessionService.requireAdmin(authorization);
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/reviews")
    public ResponseEntity<List<Review>> getReviews(@PathVariable Long id) {
        return ResponseEntity.ok(reviewService.getReviewsByProduct(id));
    }

    @PostMapping("/{id}/reviews")
    public ResponseEntity<Review> addReview(@RequestHeader(value = "Authorization", required = false) String authorization,
                                            @PathVariable Long id,
                                            @Valid @RequestBody ReviewRequestDTO dto) {
        sessionService.requireUser(authorization);
        Review review = reviewService.addReview(id, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(review);
    }

    @GetMapping("/{id}/likes")
    public ResponseEntity<LikeResponseDTO> getLikes(@PathVariable Long id,
                                                    @RequestParam(required = false) String clientKey) {
        return ResponseEntity.ok(likeService.getLikeState(id, clientKey));
    }

    @PostMapping("/{id}/likes")
    public ResponseEntity<LikeResponseDTO> toggleLike(@RequestHeader(value = "Authorization", required = false) String authorization,
                                                      @PathVariable Long id,
                                                      @Valid @RequestBody LikeRequestDTO dto) {
        sessionService.requireUser(authorization);
        return ResponseEntity.ok(likeService.toggleLike(id, dto));
    }
}
