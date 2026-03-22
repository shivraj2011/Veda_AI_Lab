const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const shell = electron.shell;
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1440,
        height: 900,
        backgroundColor: '#000000',
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#000000',
            symbolColor: '#74b1be',
            height: 30
        },
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    // 1. Try to connect to the Localhost Server
    const url = 'http://localhost:3000';

    // Load the remote URL
    win.loadURL(url).catch(err => {
        // Fallback if server is down
        win.loadURL(`data:text/html;charset=utf-8,
            <html>
            <body style="background: black; color: white; display:flex; justify-content:center; align-items:center; height:100vh; font-family:sans-serif; text-align:center;">
                <div>
                    <h1 style="color: #ef4444">Nexus Core Offline</h1>
                     <p>The backend server is not running.</p>
                     <p>Please run <b>start_nexus.bat</b> and restart this app.</p>
                     <button onclick="location.reload()" style="padding:10px 20px; cursor:pointer;">Retry Connection</button>
                </div>
            </body>
            </html>`);
    });

    // Open links in external browser
    win.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('http')) {
            shell.openExternal(url);
            return { action: 'deny' };
        }
        return { action: 'allow' };
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
