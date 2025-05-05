import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './index.css';

// Configure React Router to silence future warnings
// This is a cleaner approach than using future flags
const originalConsoleWarn = console.warn;
console.warn = function filterWarnings(msg, ...args) {
  // Filter out specific React Router warnings
  if (msg && msg.includes && (
    msg.includes('React Router Future Flag Warning') ||
    msg.includes('v7_startTransition') ||
    msg.includes('v7_relativeSplatPath')
  )) {
    return;
  }
  return originalConsoleWarn(msg, ...args);
};

function ThemedApp() {
  const { theme } = useTheme();
  return (
    <div className={theme}>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
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
