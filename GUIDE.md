# Que faire sur l’autre PC

Rien d’autre que ce qui est écrit ici. Maven n’est **pas** à installer : le projet le télécharge tout seul.

## 1. Installer 3 programmes

Installez dans cet ordre. Redémarrez le PC une fois à la fin.

1. **Git** — https://git-scm.com/download/win  
   Next partout.

2. **Java 17** — https://adoptium.net/  
   Choisissez **Temurin 17 (LTS)**, Windows, x64, fichier `.msi`.  
   Pendant l’installation, **cochez** :
   - Set JAVA_HOME variable
   - Add to PATH

3. **Node.js LTS** — https://nodejs.org/  
   Cochez **Add to PATH**.

Pour vérifier, ouvrez **Invite de commandes** et tapez :

```bat
git --version
java -version
node -v
```

`java -version` doit afficher un **17**. Si Windows dit « commande introuvable », fermez le terminal, rouvrez-le, ou redémarrez le PC.

## 2. Récupérer le projet

```bat
cd %USERPROFILE%\Desktop
git clone https://github.com/kevineagbamaro-netizen/Argile-verte-platform.git
cd Argile-verte-platform
```

Si le dossier existe déjà :

```bat
cd %USERPROFILE%\Desktop\Argile-verte-platform
git pull
```

## 3. Lancer l’API (fenêtre 1)

Double-clic sur **`start-backend.bat`**.

La **première** fois, ça peut prendre 5 à 10 minutes (téléchargement de Maven et des librairies). Laissez la fenêtre ouverte.

Quand c’est bon, ouvrez dans le navigateur :

http://localhost:8080/api/health

Vous devez voir `"status":"UP"`.

## 4. Lancer le site (fenêtre 2)

Double-clic sur **`start-frontend.bat`**.

Laissez cette fenêtre ouverte aussi. Ouvrez :

http://localhost:5173

## 5. Se connecter

- Admin : `admin@argileverte.com` / `admin123`
- Client : `client@argileverte.com` / `client123`

Dans **Administration**, onglet **Site**, mettez vos vrais numéros WhatsApp, Moov Money et Mixx by Yas.

---

Les deux fenêtres noires doivent rester ouvertes tant que vous utilisez la boutique. Pour arrêter : fermez-les.
