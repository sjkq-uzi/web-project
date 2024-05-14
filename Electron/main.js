//导入electron模块
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
//创建管理窗口
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};
app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong");
  createWindow();
  //兼容macOS如果没有打开一个窗口则主打开一个窗口
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      ipcMain.handle("ping", () => "pong");
      createWindow();
    }
  });
});
//关闭所有窗口时退出应用 (Windows & Linux)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
