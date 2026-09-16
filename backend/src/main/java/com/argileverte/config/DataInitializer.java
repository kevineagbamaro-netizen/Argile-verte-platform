package com.argileverte.config;

import com.argileverte.model.Product;
import com.argileverte.model.Review;
import com.argileverte.model.Role;
import com.argileverte.model.User;
import com.argileverte.repository.ProductRepository;
import com.argileverte.repository.ReviewRepository;
import com.argileverte.repository.UserRepository;
import com.argileverte.service.ShopSettingsService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(ProductRepository productRepository,
                                   UserRepository userRepository,
                                   ReviewRepository reviewRepository,
                                   ShopSettingsService shopSettingsService) {
        return args -> {
            shopSettingsService.ensureExists();

            // Comptes utilisateurs
            if (userRepository.count() == 0) {
                User admin = new User("admin@argileverte.com", "admin123",
                        "Administratrice Argile Verte", "+228 90 00 00 01",
                        "Lomé, Togo", Role.ROLE_ADMIN);
                userRepository.save(admin);

                User client = new User("client@argileverte.com", "client123",
                        "Client Démo", "+228 90 00 00 02",
                        "Agoè, Lomé, Togo", Role.ROLE_USER);
                userRepository.save(client);
            }

            // Catalogue produits en Franc CFA
            if (productRepository.count() == 0) {
                List<Product> products = List.of(
                        new Product(
                                "Cataplasme d'Argile Verte Prêt à l'Emploi",
                                "Pâte d'argile verte illite 100% naturelle prête à l'emploi. Soulage les articulations, purifie la peau et apaise les inflammations locales. Idéale pour les cataplasmes froids ou tiédis.",
                                new BigDecimal("7500"),
                                "Cataplasmes",
                                "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
                                45, true
                        ),
                        new Product(
                                "Poudre d'Argile Verte Ultra-Ventilée",
                                "Poudre d'une extrême finesse, séchée naturellement au soleil. Idéale pour préparations de masques de beauté, cataplasmes fins et soins détox. Riche en minéraux et oligo-éléments.",
                                new BigDecimal("5000"),
                                "Poudres",
                                "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80",
                                80, true
                        ),
                        new Product(
                                "Ovules d'Argile Verte Purifiée",
                                "Soin gynécologique traditionnel et naturel à l'argile verte purifiée et huiles végétales apaisantes. Formule douce et efficace pour l'hygiène intime et le confort féminin.",
                                new BigDecimal("9800"),
                                "Soins Spécifiques",
                                "https://images.unsplash.com/photo-1608248597359-2169b9b5e56e?auto=format&fit=crop&w=600&q=80",
                                25, false
                        ),
                        new Product(
                                "Suppositoires Naturels à l'Argile",
                                "Préparation douce et naturelle pour le confort intestinal et pelvien. À base d'argile verte purifiée et d'huiles naturelles apaisantes, sans additifs chimiques.",
                                new BigDecimal("8500"),
                                "Soins Spécifiques",
                                "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
                                30, false
                        ),
                        new Product(
                                "Collyre Douceur Argileuse",
                                "Solution saline isotonique purifiante et apaisante pour les yeux fatigués ou irrités. Formule naturelle pour le soin et l'hygiène oculaire quotidienne.",
                                new BigDecimal("6200"),
                                "Hygiène & Yeux",
                                "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80",
                                35, true
                        ),
                        new Product(
                                "Savon Solide à l'Argile Verte & Olive",
                                "Savon surgras saponifié à froid, enrichi en argile verte purifiante et huile d'olive bio pressée à froid. Nettoie en douceur tout en respectant le film hydrolipidique naturel de la peau.",
                                new BigDecimal("3500"),
                                "Savons & Hygiène",
                                "https://images.unsplash.com/photo-1607006314644-8ff72518e154?auto=format&fit=crop&w=600&q=80",
                                60, true
                        ),
                        new Product(
                                "Masque Visage Argile Verte & Aloé Vera",
                                "Masque purifiant et hydratant à base d'argile verte et de gel d'aloé vera bio. Élimine les impuretés, resserre les pores et illumine le teint en 15 minutes.",
                                new BigDecimal("6500"),
                                "Soins Visage",
                                "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=600&q=80",
                                40, true
                        ),
                        new Product(
                                "Huile Essentielle & Argile — Roll-On Anti-Douleur",
                                "Formule concentrée en argile verte, huile essentielle d'eucalyptus et de menthe poivrée pour soulager rapidement les douleurs musculaires et articulaires. Application directe par roll-on.",
                                new BigDecimal("8900"),
                                "Soins Corps",
                                "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80",
                                20, true, true
                        ),
                        new Product(
                                "Cataplasme Articulations — Édition Harmattan (brouillon)",
                                "Formule renforcée pour les articulations pendant la saison sèche. Ce produit est en brouillon : l'administrateur doit le publier pour qu'il apparaisse dans la boutique.",
                                new BigDecimal("8200"),
                                "Cataplasmes",
                                "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80",
                                15, false, false
                        )
                );

                List<Product> savedProducts = productRepository.saveAll(products);

                savedProducts.get(0).setSpotlight("GRANDE");
                savedProducts.get(0).setCampaign("HIVER");
                savedProducts.get(1).setCampaign("LIQUIDATION");
                savedProducts.get(1).setCompareAtPrice(new BigDecimal("6500"));
                savedProducts.get(5).setSpotlight("BANNIERE");
                savedProducts.get(5).setCampaign("PUBLICITE");
                savedProducts.get(6).setSpotlight("BANNIERE");
                savedProducts.get(6).setCampaign("PUBLICITE");
                productRepository.saveAll(savedProducts);

                // Avis initiaux réalistes
                Review r1 = new Review("Fatou Diallo", 5, "Excellent produit ! Mon mari l'utilise pour ses douleurs au dos et il dit que c'est le meilleur cataplasme qu'il ait jamais utilisé. Je recommande vraiment.", savedProducts.get(0));
                Review r2 = new Review("Aminata Koné", 5, "Très bonne qualité. La pâte est lisse et facile à appliquer. Résultats visibles après 3 applications.", savedProducts.get(0));
                Review r3 = new Review("Marie-Claire Bamba", 4, "Produit de qualité, efficace pour les inflammations. Livraison rapide.", savedProducts.get(0));

                Review r4 = new Review("Kadiatou Baldé", 5, "La poudre est vraiment fine et de très bonne qualité. Je l'utilise pour mes masques visage et mes résultats sont fantastiques !", savedProducts.get(1));
                Review r5 = new Review("Aïchatou Maïga", 5, "Meilleure argile en poudre que j'ai trouvée. Très pure et efficace.", savedProducts.get(1));

                Review r6 = new Review("Nathalie Ahossou", 5, "Ce savon est magique ! Ma peau est douce et propre. Toute ma famille l'utilise maintenant.", savedProducts.get(5));
                Review r7 = new Review("Mariétou Sané", 4, "Bon savon naturel, mousse bien et sent très bon.", savedProducts.get(5));

                Review r8 = new Review("Dr. Sophie Mensah", 5, "Le collyre est très doux et soulage rapidement les yeux fatigués. Je le recommande à mes patients.", savedProducts.get(4));

                reviewRepository.saveAll(List.of(r1, r2, r3, r4, r5, r6, r7, r8));

                // Recalculate ratings
                for (Product p : savedProducts) {
                    List<Review> productReviews = reviewRepository.findByProductIdOrderByCreatedAtDesc(p.getId());
                    if (!productReviews.isEmpty()) {
                        double avg = productReviews.stream().mapToInt(Review::getRating).average().orElse(5.0);
                        p.setAverageRating(Math.round(avg * 10.0) / 10.0);
                        p.setReviewCount(productReviews.size());
                        productRepository.save(p);
                    }
                }
            }

            List<Product> existing = productRepository.findAll();
            if (!existing.isEmpty() && existing.stream().noneMatch(p -> "GRANDE".equals(p.getSpotlight()))) {
                Product first = existing.get(0);
                first.setSpotlight("GRANDE");
                first.setCampaign("HIVER");
                productRepository.save(first);
                if (existing.size() > 1) {
                    Product second = existing.get(1);
                    second.setCampaign("LIQUIDATION");
                    second.setCompareAtPrice(second.getPrice().add(new BigDecimal("1500")));
                    productRepository.save(second);
                }
                if (existing.size() > 5) {
                    existing.get(5).setSpotlight("BANNIERE");
                    existing.get(5).setCampaign("PUBLICITE");
                    productRepository.save(existing.get(5));
                }
                if (existing.size() > 6) {
                    existing.get(6).setSpotlight("BANNIERE");
                    existing.get(6).setCampaign("PUBLICITE");
                    productRepository.save(existing.get(6));
                }
            }
        };
    }
}
