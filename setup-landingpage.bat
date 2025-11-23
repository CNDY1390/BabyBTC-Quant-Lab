@echo off
echo Setting up BabyBTC Landing Page...

cd landingpage
echo Installing dependencies...
call pnpm install

echo.
echo Setup complete!
echo.
echo To run the landing page locally:
echo   cd landingpage
echo   pnpm dev
echo.
echo The landing page will be available at http://localhost:5174
echo.
pause
