# Argile Verte — Plateforme Fullstack

Bienvenue sur le projet **Argile Verte**, restructuré avec une architecture moderne, robuste et découplée :
- **Backend** : Spring Boot 3 (Java 17+) avec API REST
- **Base de données** : PostgreSQL avec Spring Data JPA / Hibernate
- **Frontend** : React 18 avec Vite, TypeScript et Tailwind CSS (palette personnalisée Argile Verte)

---

## Architecture du Projet

```
argile-verte/
├── backend/                      # API REST Spring Boot & JPA
│   ├── pom.xml                   # Dépendances Maven (Web, JPA, PostgreSQL, Validation, Lombok)
│   └── src/main/
│       ├── java/com/argileverte/
│       │   ├── ArgileVerteApplication.java
│       │   ├── config/           # Configuration CORS & DataInitializer
│       │   ├── controller/       # Contrôleurs REST (/api/products, /api/users, /api/health)
│       │   ├── model/            # Entités JPA (User, Product)
│       │   ├── repository/       # Interfaces Spring Data JPA
│       │   └── service/          # Logique métier
│       └── resources/
│           └── application.yml   # Connexion PostgreSQL & dialecte
├── frontend/                     # Application React SPA
│   ├── src/
│   │   ├── components/           # Navbar, Hero, ProductList, ProductCard, Footer...
│   │   ├── services/api.ts       # Client API Axios avec proxy /api
│   │   ├── types/index.ts        # Interfaces TypeScript
│   │   └── App.tsx               # Page principale de la boutique
│   ├── package.json
│   └── vite.config.ts            # Configuration Vite & proxy port 8080
├── docker-compose.yml            # Démarrage rapide de PostgreSQL
└── README.md
```

---

## 1. Démarrage de la Base de Données PostgreSQL

### Option A : Avec Docker (Recommandé)
Dans le dossier racine, exécutez :
```bash
docker compose up -d
```
Cela démarre un conteneur PostgreSQL 16 avec la base `argile_verte_db` sur le port `5432` (`postgres:postgrespassword`).

### Option B : Avec PostgreSQL déjà installé en local
Assurez-vous que le service PostgreSQL tourne et créez la base de données :
```sql
CREATE DATABASE argile_verte_db;
```
*(Si votre mot de passe ou port est différent, modifiez-le dans `backend/src/main/resources/application.yml` ou définissez les variables d'environnement `SPRING_DATASOURCE_USERNAME` et `SPRING_DATASOURCE_PASSWORD`).*

---

## 2. Démarrage du Backend Spring Boot

Ouvrez un terminal dans le dossier `backend` :
```bash
cd backend
```

Si vous avez Maven installé :
```bash
mvn spring-boot:run
```
*(Ou ouvrez le dossier `backend` directement dans votre IDE favori comme IntelliJ IDEA, Eclipse ou VS Code, puis lancez `ArgileVerteApplication.java`).*

L'API sera disponible sur :
- Statut de santé : [http://localhost:8080/api/health](http://localhost:8080/api/health)
- Liste des produits : [http://localhost:8080/api/products](http://localhost:8080/api/products)
- Utilisateurs : [http://localhost:8080/api/users](http://localhost:8080/api/users)

> **Note** : Au premier démarrage, `DataInitializer` peuple automatiquement la base PostgreSQL avec le catalogue initial des produits naturels d'Argile Verte (Cataplasmes, Poudres ultra-ventilées, Soins, etc.).

---

## 3. Démarrage du Frontend React

Ouvrez un terminal dans le dossier `frontend` :
```bash
cd frontend
npm install
npm run dev
```

L'application React se lance sur :
👉 [http://localhost:5173](http://localhost:5173)

Le frontend se connecte automatiquement à l'API Spring Boot via le proxy Vite et affiche en temps réel :
- Un badge indiquant la connexion au backend Spring Boot & PostgreSQL.
- Le catalogue complet avec recherche en direct et filtres par catégorie.
