# 基金持有分析助手 - Windows 应用构建说明

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 运行开发版本

```bash
npm start
```

### 3. 构建 Windows 应用

#### 构建安装程序版本（推荐）
```bash
npm run build:win
```

#### 构建便携式版本（无需安装）
```bash
npm run build:win-portable
```

## 构建输出

构建完成后，您将在 `dist/` 目录中找到：

- `基金持有分析助手-Setup.exe` - Windows 安装程序
- `基金持有分析助手.exe` - 便携式可执行文件（无需安装）

## 系统要求

### 开发环境
- Node.js 16.0+
- npm 8.0+

### 运行环境
- Windows 7 或更高版本
- 无需额外依赖

## 常见问题

### Q: 如何创建应用图标？
A: 将您的图标文件放在 `assets/` 目录中：
- `icon.png` - 应用图标（256x256）
- `icon.ico` - Windows 图标

### Q: 如何修改应用名称？
A: 编辑 `package.json` 中的 `name` 和 `productName` 字段

### Q: 如何更改应用版本号？
A: 编辑 `package.json` 中的 `version` 字段

## 故障排除

### 构建失败
1. 清除 node_modules：`rm -rf node_modules`
2. 重新安装依赖：`npm install`
3. 重新构建：`npm run build:win`

### 应用无法启动
1. 检查 `main.js` 中的文件路径
2. 确保 `src/index.html` 存在
3. 检查浏览器控制台的错误信息（F12）

## 进阶配置

### 修改应用窗口大小

编辑 `main.js` 中的 `createWindow()` 函数：

```javascript
mainWindow = new BrowserWindow({
  width: 1400,  // 修改宽度
  height: 900,  // 修改高度
  // ...
});
```

### 添加自定义菜单项

编辑 `main.js` 中的 `createMenu()` 函数，在 `template` 数组中添加新的菜单项。

## 发布应用

### 创建 GitHub Release

1. 构建应用：`npm run build:win`
2. 在 GitHub 上创建新的 Release
3. 上传 `dist/` 目录中的 `.exe` 文件

### 配置自动更新

编辑 `package.json` 中的 `build` 配置，添加发布配置：

```json
"publish": {
  "provider": "github",
  "owner": "yourusername",
  "repo": "fund-analyzer"
}
```

## 更多信息

- [Electron 文档](https://www.electronjs.org/docs)
- [electron-builder 文档](https://www.electron.build/)
