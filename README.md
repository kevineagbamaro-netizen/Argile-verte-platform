# Argile Verte

Boutique de soins naturels à l’argile verte. Français, prix en franc CFA, livraison au Togo.

À installer **une seule fois** sur chaque ordinateur : **Git**, **Java 17**, **Node.js**. Maven n’est pas à installer.

---

## 1. Installer (une fois)

1. [Git pour Windows](https://git-scm.com/download/win) — Next partout.
2. [Java 17 Temurin](https://adoptium.net/) — Windows x64, fichier `.msi`. Cochez **Set JAVA_HOME** et **Add to PATH**.
3. [Node.js LTS](https://nodejs.org/) — cochez **Add to PATH**.

Redémarrez le PC. Vérifiez dans **Invite de commandes** :

```bat
git --version
java -version
node -v
```

`java -version` doit afficher un **17**.

---

## 2. Cloner le projet

```bat
cd %USERPROFILE%\Desktop
git clone https://github.com/kevineagbamaro-netizen/Argile-verte-platform.git
cd Argile-verte-platform
```

Si le dossier existe déjà, mettez à jour :

```bat
cd %USERPROFILE%\Desktop\Argile-verte-platform
git pull
```

---

## 3. Lancer la boutique (2 fenêtres)

**Fenêtre 1 — API**

```bat
cd %USERPROFILE%\Desktop\Argile-verte-platform
start-backend.bat
```

Ou double-clic sur `start-backend.bat`.

La première fois : 5 à 10 minutes. Puis ouvrez http://localhost:8080/api/health — vous devez voir `"status":"UP"`.

**Fenêtre 2 — site**

```bat
cd %USERPROFILE%\Desktop\Argile-verte-platform
start-frontend.bat
```

Ou double-clic sur `start-frontend.bat`.

Puis ouvrez http://localhost:5173

Laissez les deux fenêtres ouvertes. Pour arrêter : fermez-les.

---

## Comptes

| Rôle   | Email                     | Mot de passe |
|--------|---------------------------|--------------|
| Admin  | `admin@argileverte.com`   | `admin123`   |
| Client | `client@argileverte.com`  | `client123`  |

Dans **Administration** → **Site**, saisissez vos numéros WhatsApp, Moov Money et Mixx by Yas.
