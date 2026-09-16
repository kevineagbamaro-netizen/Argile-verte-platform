package com.argileverte.dto;

import jakarta.validation.constraints.NotBlank;

public class LikeRequestDTO {

    @NotBlank(message = "La clé client est obligatoire")
    private String clientKey;

    public LikeRequestDTO() {
    }

    public String getClientKey() {
        return clientKey;
    }

    public void setClientKey(String clientKey) {
        this.clientKey = clientKey;
    }
}
