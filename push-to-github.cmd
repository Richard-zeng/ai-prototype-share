@echo off
setlocal

cd /d "%~dp0"
set "PATH=C:\Program Files\Git\cmd;%PATH%"

git --version >nul 2>&1
if errorlevel 1 (
  echo Git was not found. Please install Git for Windows first.
  pause
  exit /b 1
)

echo.
echo Repository:
git remote -v

echo.
echo Current changes:
git status --short

echo.
echo Staging all changes...
git add -A
if errorlevel 1 goto fail

git diff --cached --quiet
if errorlevel 1 (
  echo.
  echo Creating commit...
  git commit -m "update prototype showcase"
  if errorlevel 1 goto fail
) else (
  echo.
  echo No local changes to commit.
)

echo.
echo Syncing with GitHub...
git pull --rebase
if errorlevel 1 goto fail

echo.
echo Pushing to GitHub...
git push
if errorlevel 1 goto fail

echo.
echo Done. Your updates were pushed to GitHub.
pause
exit /b 0

:fail
echo.
echo Push failed. Read the message above, then fix the issue and run this file again.
pause
exit /b 1
