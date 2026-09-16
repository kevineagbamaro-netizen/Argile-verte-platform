@echo off
setlocal EnableExtensions
title Argile Verte - API
cd /d "%~dp0"

set "LOG=%~dp0backend-erreur.log"
echo [%DATE% %TIME%] Demarrage API > "%LOG%"

if defined JAVA_HOME if exist "%JAVA_HOME%\bin\java.exe" goto :java_ok

for /d %%D in ("C:\Program Files\Eclipse Adoptium\jdk-17*") do if exist "%%~D\bin\java.exe" set "JAVA_HOME=%%~D"
if defined JAVA_HOME if exist "%JAVA_HOME%\bin\java.exe" goto :java_ok

for /d %%D in ("C:\Program Files\Microsoft\jdk-17*") do if exist "%%~D\bin\java.exe" set "JAVA_HOME=%%~D"
if defined JAVA_HOME if exist "%JAVA_HOME%\bin\java.exe" goto :java_ok

for /d %%D in ("C:\Program Files\Java\jdk-17*") do if exist "%%~D\bin\java.exe" set "JAVA_HOME=%%~D"
if defined JAVA_HOME if exist "%JAVA_HOME%\bin\java.exe" goto :java_ok

for /d %%D in ("C:\Program Files\Amazon Corretto\jdk17*") do if exist "%%~D\bin\java.exe" set "JAVA_HOME=%%~D"
if defined JAVA_HOME if exist "%JAVA_HOME%\bin\java.exe" goto :java_ok

for /d %%D in ("C:\Program Files\Eclipse Adoptium\jdk-21*") do if exist "%%~D\bin\java.exe" set "JAVA_HOME=%%~D"
if defined JAVA_HOME if exist "%JAVA_HOME%\bin\java.exe" goto :java_ok

:java_ok
if defined JAVA_HOME (
  set "PATH=%JAVA_HOME%\bin;%PATH%"
  echo JAVA_HOME=%JAVA_HOME% >> "%LOG%"
)

java -version >> "%LOG%" 2>&1
java -version >nul 2>&1
if errorlevel 1 (
  echo.
  echo ========================================
  echo  Java 17 n'est pas installe correctement.
  echo ========================================
  echo.
  echo 1. Ouvrez https://adoptium.net/
  echo 2. Temurin 17, Windows, x64, fichier .msi
  echo 3. Cochez Set JAVA_HOME et Add to PATH
  echo 4. REDEMARREZ le PC
  echo 5. Relancez start-backend.bat
  echo.
  echo Ne prenez pas Java depuis le Microsoft Store.
  echo.
  echo Details : backend-erreur.log
  goto :stay
)

echo Construction de l'API. Premiere fois : plusieurs minutes. Laissez ouvert.
echo.

set "MAVEN_USER_HOME=%~dp0backend\.m2"
cd /d "%~dp0backend"

call mvnw.cmd -DskipTests package
if errorlevel 1 (
  echo.
  echo ========================================
  echo  Echec de la construction.
  echo ========================================
  echo.
  echo Verifiez Java 17 et internet, puis relancez.
  echo Faites : git pull
  echo.
  echo Details : backend-erreur.log
  echo mvnw a echoue >> "%LOG%"
  goto :stay
)

if not exist "target\argile-verte-backend-0.0.1-SNAPSHOT.jar" (
  echo JAR introuvable apres construction. >> "%LOG%"
  echo Fichier JAR introuvable. Relancez apres git pull.
  goto :stay
)

echo.
echo API : http://localhost:8080
echo Test : http://localhost:8080/api/health
echo Laissez cette fenetre ouverte.
echo.
java -jar "target\argile-verte-backend-0.0.1-SNAPSHOT.jar"
echo.
echo L'API s'est arretee.
goto :stay

:stay
echo.
echo --- Lisez le message ci-dessus. Fermez avec la croix rouge. ---
pause
cmd /k
