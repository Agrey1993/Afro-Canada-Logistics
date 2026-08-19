@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found.
  echo Install Node.js 22 or newer from https://nodejs.org and run this file again.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Installing website packages...
  call npm install
  if errorlevel 1 (
    echo Package installation failed. Review the message above and try again.
    pause
    exit /b 1
  )
)

echo Starting Afro-Canada Logistics...
call npm run dev

endlocal
