# Argile Verte — Boutique Togo

Plateforme fullstack de vente de soins naturels à l’argile verte.

- Langue : **français**
- Monnaie : **franc CFA (F CFA)**
- Livraison : **Togo** (Lomé, Kpalimé, Kara, Sokodé, etc.)
- Frontend : React + Vite + TypeScript + Tailwind
- Backend : Spring Boot 3 (Java 17) + API REST
- Base : H2 en local, ou PostgreSQL via Docker

**Pour démarrer et tester likes, avis, panier, commandes et admin : lire [GUIDE.md](./GUIDE.md).**

## Architecture

```
├── backend/     API Spring Boot (produits, likes, avis, commandes, admin)
├── frontend/    Boutique React
├── docker-compose.yml
├── GUIDE.md
└── README.md
```

## Démarrage rapide

```bash
# Terminal 1 — API (sans Docker)
cd backend
mvn -DskipTests package
java -jar target/argile-verte-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=local

# Terminal 2 — site
cd frontend
npm install
npm run dev
```

Site : http://localhost:5173  
API : http://localhost:8080/api/health
