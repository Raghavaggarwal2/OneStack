import React, { useState, useEffect } from 'react';
import { Container, Grid, Section } from '../components/layout/index';
import { Card, ProgressBar } from '../components/ui';
import { Link } from 'react-router-dom';
import { fetchHackerNews, estimateReadTime, determineDomain } from '../services/articleService';

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <Card className="relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 text-indigo-100 bg-gradient-to-bl from-indigo-600/10">
      <Icon className="w-8 h-8" />
    </div>
    <div className="p-4">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
      {trend && (
        <p className={`mt-2 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
        </p>
      )}
    </div>
  </Card>
);

const RecentActivityCard = ({ activity }) => (
  <Card className="p-4">
    <h3 className="font-medium text-gray-900 dark:text-gray-100">Recent Activity</h3>
    <div className="mt-4 space-y-4">
      {activity.map((item, index) => (
        <div key={index} className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className={`w-2 h-2 mt-2 rounded-full ${item.type === 'completed' ? 'bg-green-500' : 'bg-indigo-500'}`} />
          </div>
          <div>
            <p className="text-sm text-gray-900 dark:text-gray-100">{item.title}</p>
            <p className="text-xs text-gray-500">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

const RecommendedCard = ({ recommendations }) => (
  <Card className="p-4">
    <h3 className="font-medium text-gray-900 dark:text-gray-100">Recommended for You</h3>
    <div className="mt-4 space-y-3">
      {recommendations.map((item, index) => (
        <a 
          href={item.url || `https://news.ycombinator.com/item?id=${item.id}`} 
          target="_blank"
          rel="noopener noreferrer"
          key={index} 
          className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer block"
        >
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{item.title}</h4>
          <p className="mt-1 text-xs text-gray-500 truncate">{item.description}</p>
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <span>{item.readTime}</span>
            <span className="mx-2">•</span>
            <span className="truncate">{item.domain}</span>
          </div>
        </a>
      ))}
    </div>
  </Card>
);

const Dashboard = () => {
  const stats = [
    { title: 'Learning Progress', value: '68%', icon: BookOpenIcon, trend: 12 },
    { title: 'Active Domains', value: '5', icon: CubeIcon, trend: -2 },
    { title: 'Articles Read', value: '24', icon: DocumentTextIcon, trend: 8 },
    { title: 'Time Spent', value: '12h', icon: ClockIcon, trend: 15 },
  ];

  const recentActivity = [
    { type: 'completed', title: 'Completed React Basics', time: '2 hours ago' },
    { type: 'started', title: 'Started Advanced JavaScript', time: '4 hours ago' },
    { type: 'completed', title: 'Completed Git Fundamentals', time: '1 day ago' },
  ];

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const recommendationData = await fetchHackerNews(5);
        
        const formattedRecommendations = recommendationData
          .filter(item => item && item.title)
          .map(item => ({
            id: item.id,
            title: item.title,
            url: item.url,
            description: item.excerpt || 'Check out this interesting tech article',
            readTime: item.readTime,
            domain: item.domain,
            difficulty: ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)],
            duration: Math.floor(Math.random() * 30) + 15,
          }));
        
        setRecommendations(formattedRecommendations);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setRecommendations([
          {
            title: 'Understanding React Hooks',
            description: 'Learn how to use React Hooks effectively',
            readTime: '5 min',
            domain: 'reactjs.org',
            url: 'https://reactjs.org/docs/hooks-intro.html',
          },
          {
            title: 'TypeScript Fundamentals',
            description: 'Get started with TypeScript in your projects',
            readTime: '10 min',
            domain: 'typescriptlang.org',
            url: 'https://www.typescriptlang.org/docs/',
          },
          {
            title: 'Advanced State Management',
            description: 'Deep dive into Redux and Context API',
            readTime: '15 min',
            domain: 'redux.js.org',
            url: 'https://redux.js.org/',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <Container>
      <Section title="Dashboard" description="Track your learning progress and explore recommended content">
        <div className="space-y-6">
          <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={6}>
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </Grid>

          <Card className="p-6">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Overall Progress</h3>
            <ProgressBar
              progress={68}
              size="lg"
              color="primary"
              label="Learning Progress"
              className="mb-6"
            />
            <Grid cols={{ base: 1, md: 3 }} gap={4}>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Frontend</h4>
                <ProgressBar progress={75} size="sm" color="success" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Backend</h4>
                <ProgressBar progress={45} size="sm" color="warning" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">DevOps</h4>
                <ProgressBar progress={30} size="sm" color="secondary" />
              </div>
            </Grid>
          </Card>

          <Grid cols={{ base: 1, lg: 2 }} gap={6}>
            <RecentActivityCard activity={recentActivity} />
            <RecommendedCard recommendations={loading ? [] : recommendations} />
          </Grid>
        </div>
      </Section>
    </Container>
  );
};

const BookOpenIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const CubeIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const DocumentTextIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ClockIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default Dashboard;