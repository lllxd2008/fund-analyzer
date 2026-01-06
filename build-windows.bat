@echo off
REM 基金持有分析助手 - Windows 构建脚本
REM 在 Windows 上运行此脚本来构建应用

echo.
echo ========================================
echo 基金持有分析助手 - Windows 构建工具
echo ========================================
echo.

REM 检查 Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo 错误: 未找到 Node.js
    echo 请先从 https://nodejs.org 下载并安装 Node.js
    pause
    exit /b 1
)

echo ✓ 已检测到 Node.js

REM 安装依赖
echo.
echo 正在安装依赖...
call npm install
if %errorlevel% neq 0 (
    echo 安装依赖失败
    pause
    exit /b 1
)

echo ✓ 依赖安装完成

REM 构建应用
echo.
echo 正在构建应用...
call npm run build:win
if %errorlevel% neq 0 (
    echo 构建失败
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✓ 构建完成！
echo ========================================
echo.
echo 您可以在以下位置找到应用:
echo - dist\基金持有分析助手-Setup.exe (安装程序)
echo - dist\基金持有分析助手.exe (便携式版本)
echo.
pause
