import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import BaseLayout from './components/layout/BaseLayout';
import { AIProviderProvider } from './context/AIProviderContext';
import ChatBot from './components/chatbot/ChatBot';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Domain from './pages/Domain';
import ArticleDetail from './pages/articles/ArticleDetail';
import DomainExplorer from './pages/domains/DomainExplorer';
import ArticleList from './pages/articles/ArticleList';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import About from './pages/About';
import Team from './pages/Team';

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

// Root redirect component
const RootRedirect = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AIProviderProvider>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<RootRedirect />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="about" element={<About />} />
          <Route path="team" element={<Team />} />
          
          {/* Protected Routes */}
          <Route path="dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          {/* Protected Domain routes */}
          <Route path="domains" element={
            <ProtectedRoute>
              <Domain />
            </ProtectedRoute>
          } />
          
          {/* Protected Individual domain routes */}
          <Route path="domain/data-structures-and-algorithms" element={<ProtectedRoute><DSA /></ProtectedRoute>} />
          <Route path="domain/aptitude" element={<ProtectedRoute><Aptitude /></ProtectedRoute>} />
          <Route path="domain/data-science" element={<ProtectedRoute><DataScience /></ProtectedRoute>} />
          <Route path="domain/generative-ai" element={<ProtectedRoute><GenAI /></ProtectedRoute>} />
          <Route path="domain/artificial-intelligence-and-machine-learning" element={<ProtectedRoute><AIML /></ProtectedRoute>} />
          <Route path="domain/devops" element={<ProtectedRoute><DevOps /></ProtectedRoute>} />
          <Route path="domain/cloud-computing" element={<ProtectedRoute><CloudComputing /></ProtectedRoute>} />
          <Route path="domain/blockchain" element={<ProtectedRoute><Blockchain /></ProtectedRoute>} />
          <Route path="domain/cyber-security" element={<ProtectedRoute><CyberSecurity /></ProtectedRoute>} />
          <Route path="domain/android-development" element={<ProtectedRoute><AndroidDev /></ProtectedRoute>} />
          <Route path="domain/ios-development" element={<ProtectedRoute><IOSDev /></ProtectedRoute>} />
          <Route path="domain/web-development" element={<ProtectedRoute><WebDev /></ProtectedRoute>} />
          <Route path="domain/game-development" element={<ProtectedRoute><GameDev /></ProtectedRoute>} />
          <Route path="domain/ui/ux" element={<ProtectedRoute><UIUX /></ProtectedRoute>} />
          <Route path="domain/ethical-hacking" element={<ProtectedRoute><EthicalHacking /></ProtectedRoute>} />
          <Route path="domain/web-3" element={<ProtectedRoute><Web3 /></ProtectedRoute>} />
          <Route path="domain/iot-(internet-of-things)" element={<ProtectedRoute><IoT /></ProtectedRoute>} />
          <Route path="domain/vlsi" element={<ProtectedRoute><VLSI /></ProtectedRoute>} />
          
          {/* Protected Article routes */}
          <Route path="articles" element={<ProtectedRoute><ArticleList /></ProtectedRoute>} />
          <Route path="articles/:id" element={<ProtectedRoute><ArticleDetail /></ProtectedRoute>} />
          <Route path="domains" element={<ProtectedRoute><DomainExplorer /></ProtectedRoute>} />

          {/* Protected Profile route */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/profile/edit" element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
      
      <ChatBot />
    </AIProviderProvider>
  );
}

export default App;
