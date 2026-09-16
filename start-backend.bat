@echo off
cd /d "%~dp0backend"
where java >nul 2>&1
if errorlevel 1 (
  echo Installez Java 17, puis relancez ce fichier.
  pause
  exit /b 1
)
where mvn >nul 2>&1
if errorlevel 1 (
  echo Installez Maven, puis relancez ce fichier.
  pause
  exit /b 1
)
echo Construction de l'API...
call mvn -DskipTests package
if errorlevel 1 (
  echo Echec de la construction.
  pause
  exit /b 1
)
echo Demarrage de l'API sur http://localhost:8080
java -jar target\argile-verte-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=local
