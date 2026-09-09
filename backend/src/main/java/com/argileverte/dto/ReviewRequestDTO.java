package com.argileverte.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ReviewRequestDTO {

    @NotBlank(message = "Le nom de l'auteur est obligatoire")
    private String authorName;

    @NotNull(message = "La note est obligatoire")
    @Min(value = 1, message = "La note minimale est 1 étoile")
    @Max(value = 5, message = "La note maximale est 5 étoiles")
    private Integer rating;

    @NotBlank(message = "Le commentaire est obligatoire")
    private String comment;

    public ReviewRequestDTO() {
    }

    public ReviewRequestDTO(String authorName, Integer rating, String comment) {
        this.authorName = authorName;
        this.rating = rating;
        this.comment = comment;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
