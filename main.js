const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Database setup
const dbPath = path.join(app.getPath('userData'), 'leo_user.db');
if (!fs.existsSync(dbPath)) {
  const db = new sqlite3.Database(dbPath);
  db.serialize(() => {
    db.run(`CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      email TEXT
    )`);
  });
  db.close();
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  win.loadURL(`file://${path.join(__dirname, 'ui/build/index.html')}`);
}
// IPC handlers for user auth
ipcMain.handle('register', async (event, { username, password, email }) => {
  return new Promise((resolve) => {
    const db = new sqlite3.Database(dbPath);
    db.run(
      'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
      [username, password, email],
      function (err) {
        db.close();
        if (err) {
          resolve({ success: false, error: 'Username already exists.' });
        } else {
          resolve({ success: true });
        }
      }
    );
  });
});

ipcMain.handle('login', async (event, { username, password }) => {
  return new Promise((resolve) => {
    const db = new sqlite3.Database(dbPath);
    db.get(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password],
      (err, row) => {
        db.close();
        if (row) {
          resolve({ success: true, user: { username: row.username, email: row.email } });
        } else {
          resolve({ success: false, error: 'Invalid credentials.' });
        }
      }
    );
  });
});

ipcMain.handle('forgotPassword', async (event, { email }) => {
  return new Promise((resolve) => {
    const db = new sqlite3.Database(dbPath);
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      db.close();
      if (row) {
        resolve({ success: true, message: 'Password reset link would be sent (demo).' });
      } else {
        resolve({ success: false, error: 'Email not found.' });
      }
    });
  });
});

app.whenReady().then(createWindow);

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
