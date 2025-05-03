import React, { useState } from 'react';
import { Container, Grid, Section } from '../components/layout';
import { Card, Input, Button } from '../components/ui';

const ArticleCard = ({ article }) => (
  <Card hover className="h-full">
    <div className="aspect-w-16 aspect-h-9 mb-4">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-full object-cover rounded-t-lg"
      />
    </div>
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-2">
        {article.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-50 text-indigo-600"
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {article.title}
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        {article.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-gray-600">{article.author.name}</span>
        </div>
        <span className="text-sm text-gray-500">{article.readTime} min read</span>
      </div>
    </div>
  </Card>
);

const FilterButton = ({ active, children, onClick }) => (
  <Button
    variant={active ? 'primary' : 'outline'}
    size="sm"
    onClick={onClick}
  >
    {children}
  </Button>
);

const Articles = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock data - replace with real data from your API
  const articles = [
    {
      id: 1,
      title: 'Getting Started with React',
      description: 'Learn the fundamentals of React and start building modern web applications.',
      image: 'https://source.unsplash.com/random/800x600?react',
      tags: ['React', 'Frontend'],
      author: {
        name: 'John Doe',
        avatar: 'https://source.unsplash.com/random/100x100?face-1',
      },
      readTime: 5,
    },
    {
      id: 2,
      title: 'Advanced TypeScript Patterns',
      description: 'Explore advanced TypeScript patterns and improve your code quality.',
      image: 'https://source.unsplash.com/random/800x600?typescript',
      tags: ['TypeScript', 'Advanced'],
      author: {
        name: 'Jane Smith',
        avatar: 'https://source.unsplash.com/random/100x100?face-2',
      },
      readTime: 8,
    },
    {
      id: 3,
      title: 'Node.js Best Practices',
      description: 'Learn the best practices for building scalable Node.js applications.',
      image: 'https://source.unsplash.com/random/800x600?javascript',
      tags: ['Node.js', 'Backend'],
      author: {
        name: 'Mike Johnson',
        avatar: 'https://source.unsplash.com/random/100x100?face-3',
      },
      readTime: 10,
    },
    {
      id: 4,
      title: 'Introduction to Docker',
      description: 'Get started with Docker and containerize your applications.',
      image: 'https://source.unsplash.com/random/800x600?docker',
      tags: ['Docker', 'DevOps'],
      author: {
        name: 'Sarah Wilson',
        avatar: 'https://source.unsplash.com/random/100x100?face-4',
      },
      readTime: 6,
    },
    {
      id: 5,
      title: 'CSS Grid Mastery',
      description: 'Master CSS Grid and create responsive layouts with ease.',
      image: 'https://source.unsplash.com/random/800x600?css',
      tags: ['CSS', 'Frontend'],
      author: {
        name: 'Alex Brown',
        avatar: 'https://source.unsplash.com/random/100x100?face-5',
      },
      readTime: 7,
    },
    {
      id: 6,
      title: 'GraphQL Fundamentals',
      description: 'Learn the basics of GraphQL and improve your API development.',
      image: 'https://source.unsplash.com/random/800x600?api',
      tags: ['GraphQL', 'API'],
      author: {
        name: 'Emily Davis',
        avatar: 'https://source.unsplash.com/random/100x100?face-6',
      },
      readTime: 9,
    },
  ];

  const filters = ['all', 'frontend', 'backend', 'devops', 'database'];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' ||
      article.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()));

    return matchesSearch && matchesFilter;
  });

  return (
    <Container>
      <Section
        title="Articles"
        description="Explore our collection of articles and tutorials to enhance your knowledge"
      >
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="sm:max-w-xs"
            />
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {filters.map((filter) => (
                <FilterButton
                  key={filter}
                  active={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </FilterButton>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </Grid>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No articles found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </Section>
    </Container>
  );
};

export default Articles; 