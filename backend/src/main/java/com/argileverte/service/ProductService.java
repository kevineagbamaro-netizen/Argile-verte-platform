package com.argileverte.service;

import com.argileverte.dto.ProductRequestDTO;
import com.argileverte.exception.ResourceNotFoundException;
import com.argileverte.model.Product;
import com.argileverte.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Transactional(readOnly = true)
    public List<Product> getPublishedProducts() {
        return productRepository.findByPublishedTrue();
    }

    @Transactional(readOnly = true)
    public List<Product> getAllProductsForAdmin() {
        return productRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Product> getFeaturedProducts() {
        return productRepository.findByPublishedTrueAndFeaturedTrue();
    }

    @Transactional(readOnly = true)
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByPublishedTrueAndCategoryIgnoreCase(category);
    }

    @Transactional(readOnly = true)
    public List<Product> searchProducts(String query) {
        return productRepository.findByPublishedTrueAndNameContainingIgnoreCase(query);
    }

    @Transactional(readOnly = true)
    public Optional<Product> getPublishedProductById(Long id) {
        return productRepository.findById(id)
                .filter(product -> Boolean.TRUE.equals(product.getPublished()));
    }

    @Transactional(readOnly = true)
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product createProduct(ProductRequestDTO dto) {
        Product product = new Product(
                dto.getName(),
                dto.getDescription(),
                dto.getPrice(),
                dto.getCategory(),
                dto.getImageUrl(),
                dto.getStock() != null ? dto.getStock() : 0,
                dto.getFeatured() != null ? dto.getFeatured() : false,
                dto.getPublished() != null ? dto.getPublished() : false
        );
        applyMerchandising(product, dto);
        Product saved = productRepository.save(product);
        if ("GRANDE".equals(saved.getSpotlight())) {
            clearOtherGrandes(saved.getId());
        }
        return saved;
    }

    public Product updateProduct(Long id, ProductRequestDTO dto) {
        return productRepository.findById(id).map(existing -> {
            existing.setName(dto.getName());
            existing.setDescription(dto.getDescription());
            existing.setPrice(dto.getPrice());
            existing.setCategory(dto.getCategory());
            existing.setImageUrl(dto.getImageUrl());
            if (dto.getStock() != null) existing.setStock(dto.getStock());
            if (dto.getFeatured() != null) existing.setFeatured(dto.getFeatured());
            if (dto.getPublished() != null) existing.setPublished(dto.getPublished());
            applyMerchandising(existing, dto);
            Product saved = productRepository.save(existing);
            if ("GRANDE".equals(saved.getSpotlight())) {
                clearOtherGrandes(saved.getId());
            }
            return saved;
        }).orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé avec l'id : " + id));
    }

    public Product setSpotlight(Long id, String spotlight) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé avec l'id : " + id));
        product.setSpotlight(spotlight == null || spotlight.isBlank() ? "NONE" : spotlight.toUpperCase());
        Product saved = productRepository.save(product);
        if ("GRANDE".equals(saved.getSpotlight())) {
            clearOtherGrandes(saved.getId());
        }
        return saved;
    }

    public Product setCampaign(Long id, String campaign) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé avec l'id : " + id));
        product.setCampaign(campaign == null || campaign.isBlank() ? "NONE" : campaign.toUpperCase());
        return productRepository.save(product);
    }

    private void applyMerchandising(Product product, ProductRequestDTO dto) {
        if (dto.getCampaign() != null) {
            product.setCampaign(dto.getCampaign().isBlank() ? "NONE" : dto.getCampaign().toUpperCase());
        }
        if (dto.getSpotlight() != null) {
            product.setSpotlight(dto.getSpotlight().isBlank() ? "NONE" : dto.getSpotlight().toUpperCase());
        }
        product.setCompareAtPrice(dto.getCompareAtPrice());
    }

    private void clearOtherGrandes(Long keepId) {
        for (Product other : productRepository.findBySpotlight("GRANDE")) {
            if (!other.getId().equals(keepId)) {
                other.setSpotlight("NONE");
                productRepository.save(other);
            }
        }
    }

    public Product publishProduct(Long id, boolean published) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé avec l'id : " + id));
        product.setPublished(published);
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Produit non trouvé avec l'id : " + id);
        }
        productRepository.deleteById(id);
    }
}
