@echo off
REM Maven from PATH — do not pin a machine-specific Java/Maven folder.
where mvn >nul 2>&1
if errorlevel 1 (
  echo Maven n'est pas installe. Installez Maven ou Java 17, puis relancez.
  echo https://maven.apache.org/download.cgi
  exit /b 1
)
call mvn %*
