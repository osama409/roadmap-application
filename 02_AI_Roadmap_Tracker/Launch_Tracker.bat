@echo off
title AI Odyssey - Generative & Agentic AI Roadmap Tracker
echo ========================================================
echo    AI Odyssey: Generative & Agentic AI Roadmap Tracker
echo ========================================================
echo.
echo Launching native desktop application window...
start msedge.exe --app="file:///%~dp0index.html" || start "" "%~dp0index.html"
exit
