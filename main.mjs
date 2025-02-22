import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'url'; // Para suportar __dirname
import path from 'path';

// Usando import dinâmico para electron-is-dev
const isDev = (await import('electron-is-dev')).default;

// Converte import.meta.url para um caminho de arquivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: true,
      contextIsolation: true, // Habilite isso
    },
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:5173' // URL do Vite em desenvolvimento
      : `file://${path.join(__dirname, 'Frontend/dist/index.html')}` // Caminho para o build do frontend
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});