import { useParams } from 'react-router-dom';

const ArticleDetail = () => {
  const { id } = useParams();

  // This would normally come from an API
  const article = {
    id,
    title: 'Getting Started with React',
    content: `
React is a popular JavaScript library for building user interfaces. It was developed by Facebook and has become one of the most widely used frontend technologies.

## Key Concepts

### Components
Components are the building blocks of React applications. They let you split the UI into independent, reusable pieces.

### Props
Props are inputs to components. They allow you to pass data from parent to child components.

### State
State is data that can change over time. When state changes, React efficiently updates and re-renders components.

## Getting Started

To start using React, you'll need to:
1. Set up Node.js and npm
2. Create a new React project
3. Learn about JSX
4. Understand component lifecycle

## Best Practices

- Keep components small and focused
- Use functional components with hooks
- Follow the principle of lifting state up
- Implement proper error boundaries
    `,
    author: {
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      role: 'Senior Developer',
    },
    publishedDate: '2024-03-15',
    readTime: '5 min',
    domain: 'Web Development',
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Article Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{article.title}</h1>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">{article.author.name}</p>
              <p className="text-sm text-gray-500">{article.author.role}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-100">
            <span>{new Date(article.publishedDate).toLocaleDateString()}</span>
            <span>•</span>
            <span>{article.readTime} read</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        {article.content.split('\\n\\n').map((paragraph, index) => {
          if (paragraph.startsWith('##')) {
            return (
              <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                {paragraph.replace('##', '').trim()}
              </h2>
            );
          } else if (paragraph.startsWith('###')) {
            return (
              <h3 key={index} className="text-xl font-bold mt-6 mb-3">
                {paragraph.replace('###', '').trim()}
              </h3>
            );
          } else if (paragraph.startsWith('- ')) {
            return (
              <ul key={index} className="list-disc list-inside my-4">
                {paragraph.split('\\n').map((item, i) => (
                  <li key={i} className="text-gray-700 my-2">
                    {item.replace('- ', '')}
                  </li>
                ))}
              </ul>
            );
          } else if (paragraph.match(/^\d\./)) {
            return (
              <ol key={index} className="list-decimal list-inside my-4">
                {paragraph.split('\\n').map((item, i) => (
                  <li key={i} className="text-gray-700  my-2">
                    {item.replace(/^\d\./, '').trim()}
                  </li>
                ))}
              </ol>
            );
          }
          return (
            <p key={index} className="text-gray-700 dark:text-gray-300 my-4">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Article Footer */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
              {article.domain}
            </span>
            <button className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
          </div>
          <div className="flex space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail; 