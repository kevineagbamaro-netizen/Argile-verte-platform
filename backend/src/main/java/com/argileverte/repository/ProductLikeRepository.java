package com.argileverte.repository;

import com.argileverte.model.ProductLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductLikeRepository extends JpaRepository<ProductLike, Long> {
    Optional<ProductLike> findByProductIdAndClientKey(Long productId, String clientKey);
    long countByProductId(Long productId);
    boolean existsByProductIdAndClientKey(Long productId, String clientKey);
}
