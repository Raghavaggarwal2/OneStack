import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  domainList, 
  fetchAllArticles, 
  fetchArticlesByDomain,
  fetchDataScienceArticles 
} from '../../services/articleService';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        // If data science is selected, use the specialized function
        let articleData;
        if (selectedDomain === 'Data Science') {
          articleData = await fetchDataScienceArticles(30);
        } else if (selectedDomain) {
          articleData = await fetchArticlesByDomain(selectedDomain);
        } else {
          articleData = await fetchAllArticles();
        }
        setArticles(articleData);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedDomain]); // Re-fetch when domain selection changes

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Articles</h1>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <select 
            className="w-full sm:w-auto px-4 py-2 appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200 pr-8 cursor-pointer"
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            style={{backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1.5em 1.5em"}}
          >
            <option value="">All Domains</option>
            {domainList.map((domain, index) => (
              <option key={index} value={domain}>{domain}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && filteredArticles.length === 0 && (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">No articles found</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block bg-white dark:bg-gray-900 rounded-lg shadow-md border p-6 hover:shadow-lg transition duration-300
              ${article.domain === 'Data Science' ? 'border-blue-200 dark:border-blue-900' : 'border-gray-100 dark:border-gray-800'}`}
          >
            {article.cover_image && (
              <div className="mb-4">
                <img 
                  src={article.cover_image} 
                  alt={article.title}
                  className="w-full h-40 object-cover rounded-md" 
                  onError={(e) => {e.target.style.display = 'none'}}
                />
              </div>
            )}
            <div className="flex justify-between items-start mb-4">
              <div className="max-w-[80%]">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">{article.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {article.excerpt.length > 150 
                    ? `${article.excerpt.substring(0, 150)}...` 
                    : article.excerpt}
                </p>
              </div>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded whitespace-nowrap
                ${article.domain === 'Data Science' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                  : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'}`}>
                {article.domain}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center space-x-4 overflow-hidden">
                <span className="truncate max-w-[120px]">{article.author}</span>
                <span className="hidden sm:inline">•</span>
                <span className="whitespace-nowrap">{article.readTime} read</span>
                <span className="hidden sm:inline">•</span>
                <span className="whitespace-nowrap text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{article.source}</span>
              </div>
              <span className="whitespace-nowrap">{new Date(article.date).toLocaleDateString()}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;