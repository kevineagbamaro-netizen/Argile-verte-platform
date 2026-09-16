@echo off
setlocal
cd /d "%~dp0frontend"

where node >nul 2>&1
if errorlevel 1 (
  echo.
  echo Node.js n'est pas installe.
  echo 1. Ouvrez https://nodejs.org/
  echo 2. Installez la version LTS
  echo 3. Cochez "Add to PATH"
  echo 4. Fermez ce fichier, rouvrez-le.
  echo.
  pause
  exit /b 1
)

echo Installation des dependances du site...
call npm install
if errorlevel 1 (
  echo Echec de npm install.
  pause
  exit /b 1
)

echo.
echo Site en cours : http://localhost:5173
echo.
call npm run dev
