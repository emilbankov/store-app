import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import { platform } from 'os';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let mainWindow;
let springProcess;

function getJarPath() {
  if (!app.isPackaged) {
    return path.join(__dirname, '../../server', 'StoreManagement-0.0.1-SNAPSHOT.jar');
  } else {
    return path.join(process.resourcesPath, 'server', 'StoreManagement-0.0.1-SNAPSHOT.jar');
  }
}

function startSpringBootApp() {
  return new Promise((resolve, reject) => {
    const isWindows = platform() === 'win32';
    const command = isWindows ? 'java.exe' : 'java';
    
    const jarPath = getJarPath();
    
    console.log(`Starting Spring Boot from: ${jarPath}`);
    
    if (!fs.existsSync(jarPath)) {
      console.error(`ERROR: JAR file not found at ${jarPath}`);
      reject(new Error('Spring Boot JAR file not found'));
      return;
    }
    
    const args = [
      '-jar', 
      jarPath,
      '--server.port=9090'
    ];
    
    springProcess = spawn(command, args);
    
    let serverStarted = false;
    
    springProcess.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(`Spring Boot: ${output}`);
      
      if (output.includes('Started Application') || output.includes('Tomcat started on port')) {
        serverStarted = true;
        console.log('Spring Boot server is ready!');
        resolve();
      }
    });
    
    springProcess.stderr.on('data', (data) => {
      console.error(`Spring Boot Error: ${data}`);
    });
    
    springProcess.on('error', (err) => {
      console.error('Failed to start Spring Boot:', err);
      reject(err);
    });
    
    setTimeout(() => {
      if (!serverStarted) {
        console.log('Spring Boot startup timeout - continuing anyway');
        resolve();
      }
    }, 30000); 
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist', 'index.html'));
  }
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(async () => {
  try {
    await startSpringBootApp();
    createWindow();
  } catch (err) {
    console.error('Error starting Spring Boot:', err);
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (springProcess) {
    console.log('Terminating Spring Boot process...');
    if (platform() === 'win32') {
      spawn('taskkill', ['/pid', springProcess.pid, '/f', '/t']);
    } else {
      springProcess.kill('SIGTERM');
    }
  }
  
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});