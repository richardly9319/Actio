import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  deferredPrompt = event;
  
  // Update UI to notify the user they can add to home screen
  const btnAdd = document.getElementById('btnAdd');
  btnAdd.style.display = 'block';

  btnAdd.addEventListener('click', (event) => {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(
      registration => {
        console.log('SW registered: ', registration);
      },
      error => {
        console.log('SW registration failed: ', error);
      }
    );
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
