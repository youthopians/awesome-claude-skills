// Youthopians Studio desktop shell for macOS and Windows.
// The app UI lives in app/index.html as a page fragment; it is wrapped in a
// full HTML document at launch so the same file also works as a web preview.
const { app, BrowserWindow, shell, Menu } = require('electron');
const fs = require('fs');
const path = require('path');

function buildPage() {
  const fragment = fs.readFileSync(path.join(__dirname, '..', 'app', 'index.html'), 'utf8');
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">` +
    `<style>[hidden]{display:none!important}body{margin:0}img{max-width:100%}</style>` +
    `</head><body>${fragment}</body></html>`;
  const out = path.join(app.getPath('userData'), 'studio.html');
  fs.writeFileSync(out, html);
  return out;
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1440, height: 900, minWidth: 380, minHeight: 600,
    title: 'Youthopians Studio',
    backgroundColor: '#FFF8E7',
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  win.loadFile(buildPage());
  // open external links in the default browser
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
}

// Data is stored in the app's local storage inside userData:
//   macOS:   ~/Library/Application Support/Youthopians Studio
//   Windows: %APPDATA%\Youthopians Studio
app.whenReady().then(() => {
  if (process.platform === 'darwin') {
    Menu.setApplicationMenu(Menu.buildFromTemplate([
      { role: 'appMenu' }, { role: 'editMenu' }, { role: 'viewMenu' }, { role: 'windowMenu' }
    ]));
  }
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
