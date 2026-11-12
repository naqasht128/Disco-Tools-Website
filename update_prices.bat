@echo off
setlocal
cd /d "%~dp0"
python scripts\update_prices.py %*
endlocal
