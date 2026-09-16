package com.argileverte.repository;

import com.argileverte.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByPublishedTrue();
    List<Product> findByPublishedTrueAndCategoryIgnoreCase(String category);
    List<Product> findByPublishedTrueAndFeaturedTrue();
    List<Product> findByPublishedTrueAndNameContainingIgnoreCase(String name);
    List<Product> findByCategoryIgnoreCase(String category);
    List<Product> findByFeaturedTrue();
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByPublishedTrueAndSpotlight(String spotlight);
    List<Product> findBySpotlight(String spotlight);
    List<Product> findByPublishedTrueAndCampaign(String campaign);
}

