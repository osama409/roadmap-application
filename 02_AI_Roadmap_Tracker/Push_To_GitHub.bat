@echo off
title Push AI Roadmap Tracker to GitHub - Osama & Morshid
echo ========================================================
echo    Pushing AI Roadmap Tracker to GitHub (osama409)
echo ========================================================
echo.
set "PATH=%LOCALAPPDATA%\MinGit\cmd;%PATH%"

git remote remove origin >nul 2>&1
git remote add origin https://github.com/osama409/roadmap-application.git
echo Target Repository: https://github.com/osama409/roadmap-application.git
echo Branch: main
echo.
echo ========================================================
echo   Pushing code to GitHub...
echo   When Git asks for credentials:
echo     1. Username: osama409
echo     2. Password: Enter your GitHub Personal Access Token (PAT)
echo        (Generate token: https://github.com/settings/tokens)
echo ========================================================
echo.
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo   SUCCESS! All files are live on GitHub:
    echo   https://github.com/osama409/roadmap-application
    echo ========================================================
) else (
    echo ========================================================
    echo   Push encountered an authentication issue.
    echo ========================================================
)
echo.
pause
