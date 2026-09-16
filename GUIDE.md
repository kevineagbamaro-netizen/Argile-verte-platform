# Guide local — Argile Verte (Togo)

Boutique de soins à l’argile verte, en **français**, prix en **franc CFA (F CFA / XOF)**, livraisons au **Togo**.

## Ce que le projet fait maintenant

| Rôle | Parcours |
| --- | --- |
| **Client** | Voir le catalogue publié, aimer un produit, laisser un avis, ajouter au panier, commander, payer à la livraison, Flooz ou Mixx by Yas |
| **Admin** | Se connecter, créer un produit (brouillon ou publié), publier / dépublier, suivre les commandes et changer le statut |

Un produit **non publié** n’apparaît pas dans la boutique. Un brouillon d’exemple existe déjà : *Cataplasme Articulations — Édition Harmattan*.

## Comptes de démonstration

- Administrateur : `admin@argileverte.com` / `admin123`
- Client : `client@argileverte.com` / `client123`

## Lancer en local (recommandé, sans Docker)

Il faut **Java 17+** et **Node.js 18+**.

### 1. Backend

Dans un terminal, à la racine du projet :

```bash
cd backend
mvn -DskipTests package
java -jar target/argile-verte-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=local
```

L’API démarre sur [http://localhost:8080](http://localhost:8080).  
Contrôle : [http://localhost:8080/api/health](http://localhost:8080/api/health)

Le profil `local` utilise une base **H2** (fichier `backend/data/`). Pas besoin de PostgreSQL.

> Si `mvn spring-boot:run` échoue, c’est souvent à cause de l’espace dans le nom du dossier. La commande `java -jar` ci-dessus fonctionne.

### 2. Frontend

Dans un **second** terminal :

```bash
cd frontend
npm install
npm run dev
```

Ouvrir [http://localhost:5173](http://localhost:5173)

## Lancer avec PostgreSQL (Docker)

```bash
docker compose up -d
cd backend
mvn spring-boot:run
```

Identifiants Docker : base `argile_verte_db`, utilisateur `postgres`, mot de passe `postgrespassword`.

## Comment tester les parcours

1. Boutique : like (cœur) et fiche produit → commentaire + note.
2. Panier → Commande : ville togolaise, téléphone `+228`, mode de paiement.
3. Connexion admin → **Administration** : publier le brouillon Harmattan, créer un produit, changer le statut d’une commande.

Les likes fonctionnent même sans compte (identifiant local du navigateur). Les avis demandent un nom. Les commandes n’exigent pas de compte.
