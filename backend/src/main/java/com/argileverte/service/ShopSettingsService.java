package com.argileverte.service;

import com.argileverte.model.ShopSettings;
import com.argileverte.repository.ShopSettingsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.function.Consumer;

@Service
@Transactional
public class ShopSettingsService {

    private final ShopSettingsRepository repository;

    public ShopSettingsService(ShopSettingsRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public ShopSettings get() {
        return repository.findById(1L).orElseGet(this::defaults);
    }

    public ShopSettings save(ShopSettings incoming) {
        ShopSettings current = repository.findById(1L).orElseGet(this::defaults);
        copy(incoming.getShopName(), current::setShopName);
        copy(incoming.getTagline(), current::setTagline);
        copy(incoming.getNavbarTagline(), current::setNavbarTagline);
        copy(incoming.getPhone(), current::setPhone);
        copy(incoming.getEmail(), current::setEmail);
        copy(incoming.getAddress(), current::setAddress);
        copy(incoming.getWhatsappNumber(), current::setWhatsappNumber);
        copy(incoming.getFloozNumber(), current::setFloozNumber);
        copy(incoming.getMixxNumber(), current::setMixxNumber);
        copy(incoming.getHeroEyebrow(), current::setHeroEyebrow);
        copy(incoming.getHeroTitle(), current::setHeroTitle);
        copy(incoming.getHeroSubtitle(), current::setHeroSubtitle);
        copy(incoming.getHeroImageUrl(), current::setHeroImageUrl);
        copy(incoming.getBienfaitsEyebrow(), current::setBienfaitsEyebrow);
        copy(incoming.getBienfaitsTitle(), current::setBienfaitsTitle);
        copy(incoming.getBienfaitsIntro(), current::setBienfaitsIntro);
        copy(incoming.getBienfait1Title(), current::setBienfait1Title);
        copy(incoming.getBienfait1Text(), current::setBienfait1Text);
        copy(incoming.getBienfait2Title(), current::setBienfait2Title);
        copy(incoming.getBienfait2Text(), current::setBienfait2Text);
        copy(incoming.getBienfait3Title(), current::setBienfait3Title);
        copy(incoming.getBienfait3Text(), current::setBienfait3Text);
        copy(incoming.getFooterBlurb(), current::setFooterBlurb);
        current.setId(1L);
        return repository.save(current);
    }

    public ShopSettings ensureExists() {
        ShopSettings current = repository.findById(1L).orElseGet(this::defaults);
        ShopSettings seed = defaults();
        boolean dirty = current.getId() == null || repository.findById(1L).isEmpty();
        dirty |= fillBlank(current.getShopName(), seed.getShopName(), current::setShopName);
        dirty |= fillBlank(current.getTagline(), seed.getTagline(), current::setTagline);
        dirty |= fillBlank(current.getNavbarTagline(), seed.getNavbarTagline(), current::setNavbarTagline);
        dirty |= fillBlank(current.getPhone(), seed.getPhone(), current::setPhone);
        dirty |= fillBlank(current.getEmail(), seed.getEmail(), current::setEmail);
        dirty |= fillBlank(current.getAddress(), seed.getAddress(), current::setAddress);
        dirty |= fillBlank(current.getHeroEyebrow(), seed.getHeroEyebrow(), current::setHeroEyebrow);
        dirty |= fillBlank(current.getHeroTitle(), seed.getHeroTitle(), current::setHeroTitle);
        dirty |= fillBlank(current.getHeroSubtitle(), seed.getHeroSubtitle(), current::setHeroSubtitle);
        dirty |= fillBlank(current.getHeroImageUrl(), seed.getHeroImageUrl(), current::setHeroImageUrl);
        dirty |= fillBlank(current.getBienfaitsEyebrow(), seed.getBienfaitsEyebrow(), current::setBienfaitsEyebrow);
        dirty |= fillBlank(current.getBienfaitsTitle(), seed.getBienfaitsTitle(), current::setBienfaitsTitle);
        dirty |= fillBlank(current.getBienfaitsIntro(), seed.getBienfaitsIntro(), current::setBienfaitsIntro);
        dirty |= fillBlank(current.getBienfait1Title(), seed.getBienfait1Title(), current::setBienfait1Title);
        dirty |= fillBlank(current.getBienfait1Text(), seed.getBienfait1Text(), current::setBienfait1Text);
        dirty |= fillBlank(current.getBienfait2Title(), seed.getBienfait2Title(), current::setBienfait2Title);
        dirty |= fillBlank(current.getBienfait2Text(), seed.getBienfait2Text(), current::setBienfait2Text);
        dirty |= fillBlank(current.getBienfait3Title(), seed.getBienfait3Title(), current::setBienfait3Title);
        dirty |= fillBlank(current.getBienfait3Text(), seed.getBienfait3Text(), current::setBienfait3Text);
        dirty |= fillBlank(current.getFooterBlurb(), seed.getFooterBlurb(), current::setFooterBlurb);
        current.setId(1L);
        return dirty ? repository.save(current) : current;
    }

    private ShopSettings defaults() {
        ShopSettings settings = new ShopSettings();
        settings.setId(1L);
        return settings;
    }

    private boolean fillBlank(String current, String fallback, Consumer<String> setter) {
        if (current == null || current.isBlank()) {
            setter.accept(fallback);
            return true;
        }
        return false;
    }

    private void copy(String value, Consumer<String> setter) {
        if (value != null) {
            setter.accept(value.trim());
        }
    }
}
