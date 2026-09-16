package com.argileverte.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "shop_settings")
public class ShopSettings {

    @Id
    private Long id = 1L;

    private String shopName = "Argile Verte";
    private String tagline = "Laboratoire naturel";
    private String navbarTagline = "Livraison soignée à Lomé et dans tout le pays";
    private String phone = "+228 90 00 00 01";
    private String email = "contact@argileverte.com";
    private String address = "Boulevard du 13 janvier, Lomé";
    private String whatsappNumber = "+228 90 00 00 01";
    private String floozNumber = "+228 90 00 00 01";
    private String mixxNumber = "+228 90 00 00 01";
    private String heroEyebrow = "Maison de soins naturels";

    @Column(length = 500)
    private String heroTitle = "La force minérale, pour toute la famille";

    @Column(length = 2000)
    private String heroSubtitle = "Cataplasmes, poudres et soins d’exception. Commandez en ligne, suivez vos favoris, et recevez votre colis avec le soin d’une maison artisanale.";

    @Column(length = 1000)
    private String heroImageUrl = "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80";

    private String bienfaitsEyebrow = "Les propriétés minérales";
    private String bienfaitsTitle = "Pourquoi choisir notre argile verte ?";

    @Column(length = 2000)
    private String bienfaitsIntro = "Utilisée depuis des millénaires pour ses vertus reminéralisantes et absorbantes, notre argile est choisie avec rigueur, pour une efficacité douce et constante.";

    private String bienfait1Title = "Détoxifiante";
    @Column(length = 1000)
    private String bienfait1Text = "Capte les impuretés et assainit les tissus en douceur.";
    private String bienfait2Title = "Apaisante";
    @Column(length = 1000)
    private String bienfait2Text = "Calme les tiraillements, courbatures et peaux sensibles.";
    private String bienfait3Title = "Séchée au soleil";
    @Column(length = 1000)
    private String bienfait3Text = "Richesse en oligo-éléments préservée, sans additifs.";

    @Column(length = 2000)
    private String footerBlurb = "Soins à l’argile verte, sélectionnés avec exigence. Une maison de confiance pour le bien-être de toute la famille.";

    public ShopSettings() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getShopName() { return shopName; }
    public void setShopName(String shopName) { this.shopName = shopName; }
    public String getTagline() { return tagline; }
    public void setTagline(String tagline) { this.tagline = tagline; }
    public String getNavbarTagline() { return navbarTagline; }
    public void setNavbarTagline(String navbarTagline) { this.navbarTagline = navbarTagline; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getWhatsappNumber() { return whatsappNumber; }
    public void setWhatsappNumber(String whatsappNumber) { this.whatsappNumber = whatsappNumber; }
    public String getFloozNumber() { return floozNumber; }
    public void setFloozNumber(String floozNumber) { this.floozNumber = floozNumber; }
    public String getMixxNumber() { return mixxNumber; }
    public void setMixxNumber(String mixxNumber) { this.mixxNumber = mixxNumber; }
    public String getHeroEyebrow() { return heroEyebrow; }
    public void setHeroEyebrow(String heroEyebrow) { this.heroEyebrow = heroEyebrow; }
    public String getHeroTitle() { return heroTitle; }
    public void setHeroTitle(String heroTitle) { this.heroTitle = heroTitle; }
    public String getHeroSubtitle() { return heroSubtitle; }
    public void setHeroSubtitle(String heroSubtitle) { this.heroSubtitle = heroSubtitle; }
    public String getHeroImageUrl() { return heroImageUrl; }
    public void setHeroImageUrl(String heroImageUrl) { this.heroImageUrl = heroImageUrl; }
    public String getBienfaitsEyebrow() { return bienfaitsEyebrow; }
    public void setBienfaitsEyebrow(String bienfaitsEyebrow) { this.bienfaitsEyebrow = bienfaitsEyebrow; }
    public String getBienfaitsTitle() { return bienfaitsTitle; }
    public void setBienfaitsTitle(String bienfaitsTitle) { this.bienfaitsTitle = bienfaitsTitle; }
    public String getBienfaitsIntro() { return bienfaitsIntro; }
    public void setBienfaitsIntro(String bienfaitsIntro) { this.bienfaitsIntro = bienfaitsIntro; }
    public String getBienfait1Title() { return bienfait1Title; }
    public void setBienfait1Title(String bienfait1Title) { this.bienfait1Title = bienfait1Title; }
    public String getBienfait1Text() { return bienfait1Text; }
    public void setBienfait1Text(String bienfait1Text) { this.bienfait1Text = bienfait1Text; }
    public String getBienfait2Title() { return bienfait2Title; }
    public void setBienfait2Title(String bienfait2Title) { this.bienfait2Title = bienfait2Title; }
    public String getBienfait2Text() { return bienfait2Text; }
    public void setBienfait2Text(String bienfait2Text) { this.bienfait2Text = bienfait2Text; }
    public String getBienfait3Title() { return bienfait3Title; }
    public void setBienfait3Title(String bienfait3Title) { this.bienfait3Title = bienfait3Title; }
    public String getBienfait3Text() { return bienfait3Text; }
    public void setBienfait3Text(String bienfait3Text) { this.bienfait3Text = bienfait3Text; }
    public String getFooterBlurb() { return footerBlurb; }
    public void setFooterBlurb(String footerBlurb) { this.footerBlurb = footerBlurb; }
}
