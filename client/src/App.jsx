import { Routes, Route } from 'react-router-dom';
import BaseLayout from './components/layout/BaseLayout';
import { AIProviderProvider } from './context/AIProviderContext';
import ChatBot from './components/chatbot/ChatBot';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Domain from './pages/Domain';
import ArticleDetail from './pages/articles/ArticleDetail';
import DomainExplorer from './pages/domains/DomainExplorer';
import ArticleList from './pages/articles/ArticleList';

// Domain Pages
import DSA from './pages/domains/DSA';
import Aptitude from './pages/domains/Aptitude';
import DataScience from './pages/domains/DataScience';
import GenAI from './pages/domains/GenAI';
import AIML from './pages/domains/AIML';
import DevOps from './pages/domains/DevOps';
import CloudComputing from './pages/domains/CloudComputing';
import Blockchain from './pages/domains/Blockchain';
import CyberSecurity from './pages/domains/CyberSecurity';
import AndroidDev from './pages/domains/AndroidDev';
import IOSDev from './pages/domains/IOSDev';
import WebDev from './pages/domains/WebDev';
import GameDev from './pages/domains/GameDev';
import UIUX from './pages/domains/UIUX';
import EthicalHacking from './pages/domains/EthicalHacking';
import Web3 from './pages/domains/Web3';
import IoT from './pages/domains/IoT';
import VLSI from './pages/domains/VLSI';

function App() {
  return (
    <AIProviderProvider>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          {/* Domain routes */}
          <Route path="domains" element={<Domain />} />
          
          {/* Individual domain routes */}
          <Route path="domain/dsa" element={<DSA />} />
          <Route path="domain/aptitude" element={<Aptitude />} />
          <Route path="domain/data-science" element={<DataScience />} />
          <Route path="domain/genai" element={<GenAI />} />
          <Route path="domain/aiml" element={<AIML />} />
          <Route path="domain/devops" element={<DevOps />} />
          <Route path="domain/cloud-computing" element={<CloudComputing />} />
          <Route path="domain/blockchain" element={<Blockchain />} />
          <Route path="domain/cyber-security" element={<CyberSecurity />} />
          <Route path="domain/android-dev" element={<AndroidDev />} />
          <Route path="domain/ios-dev" element={<IOSDev />} />
          <Route path="domain/web-dev" element={<WebDev />} />
          <Route path="domain/game-dev" element={<GameDev />} />
          <Route path="domain/ui-ux" element={<UIUX />} />
          <Route path="domain/ethical-hacking" element={<EthicalHacking />} />
          <Route path="domain/web-3" element={<Web3 />} />
          <Route path="domain/iot" element={<IoT />} />
          <Route path="domain/vlsi" element={<VLSI />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path="articles/:id" element={<ArticleDetail />} />
          <Route path="domains" element={<DomainExplorer />} />
        </Route>
      </Routes>
      
      {/* ChatBot is outside the routes so it appears on all pages */}
      <ChatBot />
    </AIProviderProvider>
  );
}

export default App;
