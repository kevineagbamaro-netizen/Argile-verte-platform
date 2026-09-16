package com.argileverte.service;

import com.argileverte.dto.ReviewRequestDTO;
import com.argileverte.exception.ResourceNotFoundException;
import com.argileverte.model.Product;
import com.argileverte.model.Review;
import com.argileverte.repository.ProductRepository;
import com.argileverte.repository.ReviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final NotificationService notificationService;

    public ReviewService(ReviewRepository reviewRepository,
                         ProductRepository productRepository,
                         NotificationService notificationService) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
        this.notificationService = notificationService;
    }

    @Transactional(readOnly = true)
    public List<Review> getReviewsByProduct(Long productId) {
        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId);
    }

    public Review addReview(Long productId, ReviewRequestDTO dto) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé avec l'id : " + productId));

        Review review = new Review(dto.getAuthorName(), dto.getRating(), dto.getComment(), product);
        review = reviewRepository.save(review);

        // Recalculate product rating
        List<Review> allReviews = reviewRepository.findByProductIdOrderByCreatedAtDesc(productId);
        double avg = allReviews.stream().mapToInt(Review::getRating).average().orElse(5.0);
        product.setAverageRating(Math.round(avg * 10.0) / 10.0);
        product.setReviewCount(allReviews.size());
        productRepository.save(product);
        notificationService.notify(
                "AVIS",
                "Nouvel avis sur « " + product.getName() + " »",
                dto.getAuthorName() + " a noté " + dto.getRating() + "/5",
                "/admin"
        );
        return review;
    }
}
