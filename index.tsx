import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// ALCHEMY CONNECT: Emergency Bootstrapper
const logToScreen = (msg: string, color: string = '#00e5ff') => {
  const monitor = document.getElementById('boot-monitor');
  if (monitor) {
    const logDiv = document.createElement('div');
    logDiv.style.color = color;
    logDiv.style.fontSize = '11px';
    logDiv.style.marginTop = '6px';
    logDiv.style.fontFamily = 'monospace';
    logDiv.style.borderLeft = `2px solid ${color}`;
    logDiv.style.paddingLeft = '8px';
    logDiv.innerText = msg;
    monitor.appendChild(logDiv);
  }
  console.log(`[BOOT] ${msg}`);
};

window.addEventListener('error', (e) => {
  logToScreen(`CRITICAL: ${e.message}`, '#ff3d00');
});

const boot = async () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  logToScreen("System linkage established.");
  logToScreen(`Browser: ${navigator.userAgent.substring(0, 30)}...`);
  logToScreen("Loading React engine...");

  try {
    const root = createRoot(rootElement);
    logToScreen("React engine ready.");

    logToScreen("Initializing Alchemist application...");
    (window as any).REACT_BOOTED = true;

    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    logToScreen("App mounted. System online.");
  } catch (err: any) {
    logToScreen(`MTX_FATAL: ${err.message}`, '#ff3d00');
  }
};

// Start boot sequence
boot();

// Re-enable SW for production with safety
if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => logToScreen("PWA Shield Active."))
      .catch(e => logToScreen(`PWA: ${e.message}`, '#ff9100'));
  });
}