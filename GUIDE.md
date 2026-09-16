# Argile Verte

Boutique de soins naturels à l’argile verte. Français, prix en franc CFA, livraison au Togo.

## Installation

Java 17+, Maven et Node.js 18+.

```bash
git clone https://github.com/kevineagbamaro-netizen/Argile-verte-platform.git
cd Argile-verte-platform
```

### API

```bash
cd backend
mvn -DskipTests package
java -jar target/argile-verte-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=local
```

http://localhost:8080

### Site

```bash
cd frontend
npm install
npm run dev
```

http://localhost:5173

## Comptes

- Admin : `admin@argileverte.com` / `admin123`
- Client : `client@argileverte.com` / `client123`

L’administrateur gère le catalogue, les textes du site, WhatsApp, Moov Money et Mixx by Yas depuis **Administration**.
