package com.argileverte.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom du produit est obligatoire")
    @Column(nullable = false)
    private String name;

    @Column(length = 2000)
    private String description;

    // Prix en Franc CFA (ex: 7500)
    @PositiveOrZero(message = "Le prix doit être positif ou nul")
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    private String category;

    private String imageUrl;

    private Integer stock = 0;

    private Boolean featured = false;

    private Double averageRating = 5.0;

    private Integer reviewCount = 0;

    private Integer likeCount = 0;

    /** Si false, le produit n'apparaît pas dans la boutique (brouillon admin). */
    @Column(nullable = false)
    private Boolean published = true;

    /** NONE, HIVER, LIQUIDATION, PUBLICITE */
    @Column(length = 30)
    private String campaign = "NONE";

    /** NONE, GRANDE, BANNIERE */
    @Column(length = 30)
    private String spotlight = "NONE";

    @Column(precision = 12, scale = 2)
    private java.math.BigDecimal compareAtPrice;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("createdAt DESC")
    @JsonIgnore
    private List<Review> reviews = new ArrayList<>();

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Product() {
        this.createdAt = LocalDateTime.now();
        this.averageRating = 5.0;
        this.reviewCount = 0;
        this.likeCount = 0;
        this.published = true;
        this.campaign = "NONE";
        this.spotlight = "NONE";
    }

    public Product(String name, String description, BigDecimal price, String category, String imageUrl, Integer stock, Boolean featured) {
        this(name, description, price, category, imageUrl, stock, featured, true);
    }

    public Product(String name, String description, BigDecimal price, String category, String imageUrl, Integer stock, Boolean featured, Boolean published) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.imageUrl = imageUrl;
        this.stock = stock;
        this.featured = featured;
        this.published = published != null ? published : true;
        this.averageRating = 5.0;
        this.reviewCount = 0;
        this.likeCount = 0;
        this.campaign = "NONE";
        this.spotlight = "NONE";
        this.createdAt = LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
        if (this.averageRating == null) {
            this.averageRating = 5.0;
        }
        if (this.reviewCount == null) {
            this.reviewCount = 0;
        }
        if (this.likeCount == null) {
            this.likeCount = 0;
        }
        if (this.published == null) {
            this.published = true;
        }
        if (this.campaign == null) {
            this.campaign = "NONE";
        }
        if (this.spotlight == null) {
            this.spotlight = "NONE";
        }
    }

    public void recalculateRatings() {
        if (this.reviews == null || this.reviews.isEmpty()) {
            this.averageRating = 5.0;
            this.reviewCount = 0;
            return;
        }
        double sum = 0.0;
        for (Review r : this.reviews) {
            sum += r.getRating();
        }
        this.reviewCount = this.reviews.size();
        this.averageRating = Math.round((sum / this.reviewCount) * 10.0) / 10.0;
    }

    public void addReview(Review review) {
        if (this.reviews == null) {
            this.reviews = new ArrayList<>();
        }
        this.reviews.add(review);
        review.setProduct(this);
        recalculateRatings();
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Boolean getFeatured() {
        return featured;
    }

    public void setFeatured(Boolean featured) {
        this.featured = featured;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    public Integer getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(Integer reviewCount) {
        this.reviewCount = reviewCount;
    }

    public Integer getLikeCount() {
        return likeCount != null ? likeCount : 0;
    }

    public void setLikeCount(Integer likeCount) {
        this.likeCount = likeCount;
    }

    public Boolean getPublished() {
        return published == null || published;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    public String getCampaign() {
        return campaign == null ? "NONE" : campaign;
    }

    public void setCampaign(String campaign) {
        this.campaign = campaign;
    }

    public String getSpotlight() {
        return spotlight == null ? "NONE" : spotlight;
    }

    public void setSpotlight(String spotlight) {
        this.spotlight = spotlight;
    }

    public java.math.BigDecimal getCompareAtPrice() {
        return compareAtPrice;
    }

    public void setCompareAtPrice(java.math.BigDecimal compareAtPrice) {
        this.compareAtPrice = compareAtPrice;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
        recalculateRatings();
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
