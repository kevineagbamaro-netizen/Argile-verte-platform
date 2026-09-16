package com.argileverte.controller;

import com.argileverte.model.ShopSettings;
import com.argileverte.service.ShopSettingsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/shop")
public class ShopController {

    private final ShopSettingsService shopSettingsService;

    public ShopController(ShopSettingsService shopSettingsService) {
        this.shopSettingsService = shopSettingsService;
    }

    @GetMapping
    public ResponseEntity<ShopSettings> getShop() {
        return ResponseEntity.ok(shopSettingsService.ensureExists());
    }
}
