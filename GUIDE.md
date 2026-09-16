# Argile Verte

Boutique de soins naturels à l’argile verte. Français, prix en franc CFA, livraison au Togo.

## Installation

Il faut **Java 17** et **Maven** (et Node.js 18 pour le site).

```bash
git clone https://github.com/kevineagbamaro-netizen/Argile-verte-platform.git
cd Argile-verte-platform
```

### Windows — API

Double-clic sur `start-backend.bat`, ou dans un terminal :

```bat
cd backend
mvn -DskipTests package
java -jar target\argile-verte-backend-0.0.1-SNAPSHOT.jar
```

Ouvrir http://localhost:8080/api/health — vous devez voir `"status":"UP"`.

Sans PostgreSQL : le projet utilise une base locale H2. Ne lancez pas `mvn spring-boot:run` si le dossier a un espace dans le nom ; utilisez `java -jar` comme ci-dessus.

### Site

```bat
cd frontend
npm install
npm run dev
```

http://localhost:5173

## Comptes

- Admin : `admin@argileverte.com` / `admin123`
- Client : `client@argileverte.com` / `client123`

L’administrateur gère le catalogue, les textes, WhatsApp, Moov Money et Mixx depuis **Administration**.
