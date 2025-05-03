import { Routes, Route } from 'react-router-dom';
import BaseLayout from './components/layout/BaseLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import DomainExplorer from './pages/domains/DomainExplorer';
import ArticleList from './pages/articles/ArticleList';
import ArticleDetail from './pages/articles/ArticleDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="domains" element={<DomainExplorer />} />
        <Route path="articles" element={<ArticleList />} />
        <Route path="articles/:id" element={<ArticleDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
