const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let backendProcess = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  console.log("🔵 Loading frontend...");
  win.loadFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
}

function startBackend() {
  const backendPath = path.join(__dirname, 'backend', 'src', 'server.js');
  console.log("🟢 Starting backend from:", backendPath);

  backendProcess = spawn('node', [backendPath], {
    cwd: path.join(__dirname, 'backend'),
    shell: true,
    stdio: 'inherit',
  });

  backendProcess.on('error', (err) => {
    console.error("❌ Backend failed to start:", err);
  });

  backendProcess.on('exit', (code) => {
    console.log(`🔴 Backend exited with code ${code}`);
  });
}

app.whenReady().then(() => {
  startBackend();
  createWindow();
});

app.on('window-all-closed', () => {
  if (backendProcess) backendProcess.kill();
  if (process.platform !== 'darwin') app.quit();
});
