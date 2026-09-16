@echo off
setlocal
cd /d "%~dp0backend"

where java >nul 2>&1
if errorlevel 1 (
  echo.
  echo Java 17 n'est pas installe.
  echo 1. Ouvrez https://adoptium.net/
  echo 2. Telechargez Temurin 17 JDK Windows x64 .msi
  echo 3. Installez et COCHEZ "Set JAVA_HOME variable" et "Add to PATH"
  echo 4. Fermez ce fichier, rouvrez-le.
  echo.
  pause
  exit /b 1
)

if not defined JAVA_HOME (
  for /f "delims=" %%i in ('where java') do (
    set "JAVA_EXE=%%i"
    goto :found_java
  )
)
:found_java
if not defined JAVA_HOME if defined JAVA_EXE (
  for %%i in ("%JAVA_EXE%") do set "JAVA_BIN=%%~dpi"
  for %%i in ("%JAVA_BIN%..") do set "JAVA_HOME=%%~fi"
)

echo Construction de l'API (la premiere fois peut durer plusieurs minutes)...
call mvnw.cmd -DskipTests package
if errorlevel 1 (
  echo.
  echo Echec de la construction. Verifiez Java 17 et votre connexion internet.
  pause
  exit /b 1
)

echo.
echo API en cours : http://localhost:8080
echo Test : http://localhost:8080/api/health
echo.
java -jar target\argile-verte-backend-0.0.1-SNAPSHOT.jar
