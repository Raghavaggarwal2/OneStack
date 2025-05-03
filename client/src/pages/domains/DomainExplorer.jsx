const DomainExplorer = () => {
  const domains = [
    { id: 1, name: 'Web Development', topics: 24, color: 'blue' },
    { id: 2, name: 'Data Science', topics: 18, color: 'green' },
    { id: 3, name: 'Mobile Development', topics: 15, color: 'purple' },
    { id: 4, name: 'DevOps', topics: 12, color: 'red' },
    { id: 5, name: 'Machine Learning', topics: 20, color: 'yellow' },
    { id: 6, name: 'Cloud Computing', topics: 16, color: 'indigo' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Domain Explorer</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search domains..."
            className="pl-10 pr-4 py-2 dark:bg-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains.map((domain) => (
          <div
            key={domain.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 p-6 hover:shadow-lg transition duration-300"
          >
            <div className={`w-12 h-12 rounded-lg bg-${domain.color}-100 flex items-center justify-center mb-4`}>
              <svg
                className={`w-6 h-6 text-${domain.color}-600`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{domain.name}</h3>
            <p className="text-gray-600 mb-4">{domain.topics} Topics</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">4.8 ★★★★★</span>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DomainExplorer; 