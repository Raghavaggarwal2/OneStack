import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import App from './App';
import './index.css';

function ThemedApp() {
  const { theme } = useTheme();
  return (
    <div className={theme}>
      <Router>
        <App />
      </Router>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  </React.StrictMode>
);
