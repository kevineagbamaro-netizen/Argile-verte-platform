package com.argileverte.service;

import com.argileverte.dto.LikeRequestDTO;
import com.argileverte.dto.LikeResponseDTO;
import com.argileverte.exception.ResourceNotFoundException;
import com.argileverte.model.Product;
import com.argileverte.model.ProductLike;
import com.argileverte.repository.ProductLikeRepository;
import com.argileverte.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LikeService {

    private final ProductLikeRepository productLikeRepository;
    private final ProductRepository productRepository;

    public LikeService(ProductLikeRepository productLikeRepository, ProductRepository productRepository) {
        this.productLikeRepository = productLikeRepository;
        this.productRepository = productRepository;
    }

    @Transactional(readOnly = true)
    public LikeResponseDTO getLikeState(Long productId, String clientKey) {
        Product product = getProduct(productId);
        boolean liked = clientKey != null && !clientKey.isBlank()
                && productLikeRepository.existsByProductIdAndClientKey(productId, clientKey);
        return new LikeResponseDTO(productId, safeCount(product), liked);
    }

    public LikeResponseDTO toggleLike(Long productId, LikeRequestDTO dto) {
        Product product = getProduct(productId);
        String clientKey = dto.getClientKey().trim();

        return productLikeRepository.findByProductIdAndClientKey(productId, clientKey)
                .map(existing -> {
                    productLikeRepository.delete(existing);
                    long count = productLikeRepository.countByProductId(productId);
                    product.setLikeCount((int) count);
                    productRepository.save(product);
                    return new LikeResponseDTO(productId, count, false);
                })
                .orElseGet(() -> {
                    productLikeRepository.save(new ProductLike(product, clientKey));
                    long count = productLikeRepository.countByProductId(productId);
                    product.setLikeCount((int) count);
                    productRepository.save(product);
                    return new LikeResponseDTO(productId, count, true);
                });
    }

    private Product getProduct(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé avec l'id : " + productId));
    }

    private long safeCount(Product product) {
        return product.getLikeCount() != null ? product.getLikeCount() : 0;
    }
}
