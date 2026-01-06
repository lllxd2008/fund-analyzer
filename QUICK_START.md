# 快速开始指南

## Windows 用户

### 第一步：安装 Node.js

1. 访问 https://nodejs.org/
2. 下载 LTS 版本（推荐）
3. 运行安装程序，按默认选项安装

### 第二步：构建应用

1. 在项目目录中找到 `build-windows.bat` 文件
2. 双击运行此文件
3. 等待构建完成（第一次会下载一些依赖，可能需要几分钟）

### 第三步：运行应用

构建完成后，您将在 `dist/` 目录中找到：
- `基金持有分析助手-Setup.exe` - 安装程序版本
- `基金持有分析助手.exe` - 便携式版本（推荐，无需安装）

选择其中一个运行即可。

## 手动构建步骤（如果脚本失败）

1. 打开命令提示符（CMD）或 PowerShell
2. 进入项目目录：`cd fund-analyzer-electron`
3. 安装依赖：`npm install`
4. 构建应用：`npm run build:win`
5. 在 `dist/` 目录中找到生成的 `.exe` 文件

## 常见问题

### Q: 提示找不到 Node.js
A: 请确保已安装 Node.js，并重启电脑后重试

### Q: 构建时出现错误
A: 
1. 删除 `node_modules` 文件夹
2. 删除 `package-lock.json` 文件
3. 重新运行 `build-windows.bat`

### Q: 应用无法打开
A: 
1. 确保您使用的是 Windows 7 或更高版本
2. 尝试以管理员身份运行应用
3. 检查是否有杀毒软件阻止了应用

## 使用应用

1. 打开应用
2. 点击"选择 Excel 文件"或拖放您的基金持有清单
3. 查看分析结果
4. 导出 Excel 或 PDF 报告

## 获取帮助

如有问题，请查看 `README.md` 和 `BUILD_INSTRUCTIONS.md` 文件。
