import { Link } from 'react-router-dom';

const ArticleList = () => {
  const articles = [
    {
      id: 1,
      title: 'Getting Started with React',
      excerpt: 'Learn the basics of React and build your first component',
      author: 'John Doe',
      readTime: '5 min',
      domain: 'Web Development',
      date: '2024-03-15',
    },
    {
      id: 2,
      title: 'Python for Data Science',
      excerpt: 'Essential Python concepts for data analysis and visualization',
      author: 'Jane Smith',
      readTime: '8 min',
      domain: 'Data Science',
      date: '2024-03-14',
    },
    {
      id: 3,
      title: 'DevOps Best Practices',
      excerpt: 'Learn about CI/CD, containerization, and deployment strategies',
      author: 'Mike Johnson',
      readTime: '10 min',
      domain: 'DevOps',
      date: '2024-03-13',
    },
  ];

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Articles</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="pl-10 pr-4 py-2 border dark:bg-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <select className="px-4 py-2 border dark:bg-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Domains</option>
            <option value="web">Web Development</option>
            <option value="data">Data Science</option>
            <option value="devops">DevOps</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/articles/${article.id}`}
            className="block bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-100 p-6 hover:shadow-lg transition duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{article.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{article.excerpt}</p>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {article.domain}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center space-x-4">
                <span>{article.author}</span>
                <span>•</span>
                <span>{article.readTime} read</span>
              </div>
              <span>{new Date(article.date).toLocaleDateString()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticleList; 