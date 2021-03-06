"use strict";

const app = require("app");
const BrowserWindow = require("browser-window");

// report crashes to the Electron project
require("crash-reporter").start();

// adds debug features like hotkeys for triggering dev tools and reload
require("electron-debug")();

// prevent window being GC"d
let mainWindow;

function onClosed() {
  // deref the window
  // for multiple windows store them in an array
  mainWindow = null;
}

function createMainWindow () {
  const win = new BrowserWindow({
    width: Math.floor(1600 / 1.3),
    height: Math.floor(900 / 1.3),
    resizable: true
  });

  win.loadUrl(`file://${__dirname}/index.html`);
  win.on("closed", onClosed);

  return win;
}

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate-with-no-open-windows", function () {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

app.on("ready", function () {
  mainWindow = createMainWindow();
});
