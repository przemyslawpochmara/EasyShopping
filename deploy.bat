@echo off
echo ========================================
echo EasyShopping - GitHub Deployment Script
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please download and install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo Git is installed!
echo.

REM Get GitHub username
set /p username="Enter your GitHub username: "
if "%username%"=="" (
    echo ERROR: Username cannot be empty!
    pause
    exit /b 1
)

echo.
echo ========================================
echo IMPORTANT: Before continuing...
echo ========================================
echo 1. Go to https://github.com
echo 2. Click the + button (top right)
echo 3. Click "New repository"
echo 4. Name it: easyshopping
echo 5. Make it PUBLIC
echo 6. Click "Create repository"
echo.
set /p ready="Have you created the repository? (y/n): "
if /i not "%ready%"=="y" (
    echo Deployment cancelled.
    pause
    exit /b 0
)

echo.
echo Initializing Git repository...
git init

echo.
echo Adding files...
git add .

echo.
echo Creating commit...
git commit -m "Initial commit - EasyShopping PWA"

echo.
echo Setting up remote...
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/%username%/easyshopping.git

echo.
echo Pushing to GitHub...
echo (You may need to enter your GitHub credentials)
git push -u origin main

if errorlevel 1 (
    echo.
    echo ========================================
    echo ERROR: Push failed!
    echo ========================================
    echo This might be because:
    echo 1. The repository doesn't exist
    echo 2. Wrong username
    echo 3. Authentication failed
    echo.
    echo Try again or push manually with:
    echo git push -u origin main
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCCESS! Files uploaded to GitHub!
echo ========================================
echo.
echo Now enable GitHub Pages:
echo 1. Go to: https://github.com/%username%/easyshopping
echo 2. Click "Settings"
echo 3. Click "Pages" (left sidebar)
echo 4. Under "Source", select "main" branch
echo 5. Click "Save"
echo 6. Wait 1-2 minutes
echo.
echo Your app will be live at:
echo https://%username%.github.io/easyshopping
echo.
echo Open this URL on your phone to install the app!
echo.
pause
