const { app, BrowserWindow } = require("electron");
const path = require("node:path");
const { autoUpdater } = require("electron-updater");

// run this as early in the main process as possible
if (require("electron-squirrel-startup")) app.quit();

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: "./src/Resources/icon.ico",
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
    },
    autoHideMenuBar: true,
  });

  // Set Content Security Policy
  mainWindow.webContents.session.webRequest.onHeadersReceived(
    ({ responseHeaders }, callback) => {
      Object.keys(responseHeaders).forEach((header) => {
        if (/^content-security-policy/i.test(header)) {
          delete responseHeaders[header];
        }
      });
      callback({ cancel: false, responseHeaders });
    }
  );

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // Check for updates after creating the window
  autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on("update-available", () => {
  log.info("Update available.");
});

autoUpdater.on("update-downloaded", (info) => {
  log.info("Update downloaded; will install now");
  // Quit and install the update after it is downloaded
  autoUpdater.quitAndInstall();
});


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
