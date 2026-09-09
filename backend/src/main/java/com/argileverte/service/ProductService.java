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
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Product> getFeaturedProducts() {
        return productRepository.findByFeaturedTrue();
    }

    @Transactional(readOnly = true)
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategoryIgnoreCase(category);
    }

    @Transactional(readOnly = true)
    public List<Product> searchProducts(String query) {
        return productRepository.findByNameContainingIgnoreCase(query);
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
                dto.getFeatured() != null ? dto.getFeatured() : false
        );
        return productRepository.save(product);
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
            return productRepository.save(existing);
        }).orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé avec l'id : " + id));
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Produit non trouvé avec l'id : " + id);
        }
        productRepository.deleteById(id);
    }
}
