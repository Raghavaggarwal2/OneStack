import React, { useState, useEffect } from 'react';
import { Container, Grid, Section } from '../components/layout';
import { Card, Input, Button } from '../components/ui';
import { fetchAllArticles, domainList, fetchDataScienceArticles } from '../services/articleService';

const ArticleCard = ({ article }) => (
  <Card hover className="h-full">
    <div className="aspect-w-16 aspect-h-9 mb-4">
      <img
        src={article.cover_image || `https://source.unsplash.com/random/800x600?${article.domain.toLowerCase().replace(/\s+/g, '-')}`}
        alt={article.title}
        className="w-full h-full object-cover rounded-t-lg"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://source.unsplash.com/random/800x600?${article.domain.toLowerCase().replace(/\s+/g, '-')}`;
        }}
      />
    </div>
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-2">
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-50 text-indigo-600">
          {article.domain}
        </span>
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
          {article.source}
        </span>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {article.title}
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        {article.excerpt?.length > 100 ? `${article.excerpt.substring(0, 100)}...` : article.excerpt}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">{article.author}</span>
        <span className="text-sm text-gray-500">{article.readTime}</span>
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
  const [articles, setArticles] = useState([]);
  const [dsArticles, setDSArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      try {
        const [generalData, dsData] = await Promise.all([
          fetchAllArticles(),
          fetchDataScienceArticles(6)
        ]);
        
        setArticles(generalData);
        setDSArticles(dsData);
      } catch (err) {
        console.error('Error loading articles:', err);
      } finally {
        setLoading(false);
      }
    };
    
    getArticles();
  }, []);

  const filters = ['all', ...domainList.slice(0, 6).map(d => d.toLowerCase())];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || 
      article.domain?.toLowerCase() === activeFilter.toLowerCase();

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

          {/* Data Science Featured Section */}
          {!loading && dsArticles.length > 0 && activeFilter === 'all' && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Data Science Spotlight</h2>
                <Button 
                  variant="link" 
                  size="sm"
                  onClick={() => setActiveFilter('data science')}
                >
                  View all Data Science articles →
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dsArticles.slice(0, 3).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </Grid>
          )}

          {!loading && filteredArticles.length === 0 && (
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