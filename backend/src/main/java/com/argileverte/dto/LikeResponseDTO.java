package com.argileverte.dto;

public class LikeResponseDTO {

    private Long productId;
    private long likeCount;
    private boolean liked;

    public LikeResponseDTO() {
    }

    public LikeResponseDTO(Long productId, long likeCount, boolean liked) {
        this.productId = productId;
        this.likeCount = likeCount;
        this.liked = liked;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public long getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(long likeCount) {
        this.likeCount = likeCount;
    }

    public boolean isLiked() {
        return liked;
    }

    public void setLiked(boolean liked) {
        this.liked = liked;
    }
}
