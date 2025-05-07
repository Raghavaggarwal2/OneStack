import React, { useState, useEffect } from 'react';
import { Container, Section, Grid } from '../components/layout';
import { getAllDomainsProgress, getRecentActivity } from '../services/domainService';
import { Card } from '../components/ui';
import ProgressBar from '../components/ui/ProgressBar';
import { BookOpenIcon, CubeIcon, DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const StatCard = ({ title, value, icon: Icon }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Card className="p-4">
      <div className="flex items-center">
        <div className="flex-1">
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{value}</p>
        </div>
        {Icon && (
          <div className="p-3 bg-indigo-50 rounded-full">
            <Icon className="w-6 h-6 text-indigo-600" />
          </div>
        )}
      </div>
    </Card>
  </motion.div>
);

const RecentActivityCard = ({ activity }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="p-4">
      <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Recent Activity</h3>
      <div className="mt-4 space-y-4">
        {activity.length > 0 ? (
          activity.slice(0, 3).map((item) => (
            <div key={`${item.domainId}-${item.topicId}`} className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 mt-2 rounded-full bg-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-900 dark:text-gray-100">{item.title}</p>
                <p className="text-xs text-gray-500">
                  {new Date(item.time).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No recent activity</p>
        )}
      </div>
    </Card>
  </motion.div>
);

const RecommendedArticles = ({ articles }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <Card className="p-4 bg-blue-50 dark:bg-blue-900">
      <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Recommended Articles</h3>
      <div className="space-y-3">
        {articles.map((article, index) => (
          <a 
            key={index}
            href={article.url}
            className="block p-3 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
          >
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{article.title}</p>
            <p className="text-xs text-gray-500 mt-1">Domain: {article.domain}</p>
          </a>
        ))}
      </div>
    </Card>
  </motion.div>
);

const Dashboard = () => {
  const [domainsProgress, setDomainsProgress] = useState([]);
  const [totalTopicsCompleted, setTotalTopicsCompleted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const [recommendedArticles, setRecommendedArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch domains progress
        const { domainsProgress, totalTopicsCompleted } = await getAllDomainsProgress();
        setDomainsProgress(domainsProgress);
        setTotalTopicsCompleted(totalTopicsCompleted);
        
        // Fetch recent activity
        const activity = await getRecentActivity();
        setRecentActivity(activity);
        
        // Mock recommended articles - replace with actual API call
        setRecommendedArticles([
          { title: 'Mastering React Hooks', domain: 'Web Dev', url: '#' },
          { title: 'Introduction to Docker', domain: 'DevOps', url: '#' },
          { title: 'Understanding Data Structures', domain: 'DSA', url: '#' },
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate overall progress
  const calculateOverallProgress = () => {
    if (!domainsProgress.length) return 0;
    const totalCompleted = domainsProgress.reduce((sum, domain) => sum + domain.completedTopics, 0);
    const totalTopics = domainsProgress.reduce((sum, domain) => sum + domain.totalTopics, 0);
    return totalTopics ? Math.round((totalCompleted / totalTopics) * 100) : 0;
  };

  // Get top domains by progress
  const getTopDomains = () => {
    return domainsProgress
      .sort((a, b) => {
        const progressA = (a.completedTopics / a.totalTopics) * 100;
        const progressB = (b.completedTopics / b.totalTopics) * 100;
        return progressB - progressA;
      })
      .slice(0, 3);
  };

  const stats = [
    { 
      title: 'Learning Progress', 
      value: `${calculateOverallProgress()}%`, 
      icon: BookOpenIcon
    },
    { 
      title: 'Active Domains', 
      value: domainsProgress.length.toString(), 
      icon: CubeIcon
    },
    { 
      title: 'Topics Completed', 
      value: totalTopicsCompleted.toString(), 
      icon: DocumentTextIcon
    },
    { 
      title: 'Time Spent', 
      value: '12h', 
      icon: ClockIcon
    }
  ];

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Section title="Dashboard" description="Track your learning progress and explore recommended content">
        <div className="space-y-6">
          <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={6}>
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </Grid>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Overall Progress Card */}
            <Card className="p-6 lg:col-span-2">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Domain Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {getTopDomains().map((domain, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-24 h-24 mb-3">
                      <CircularProgressbar
                        value={Math.round((domain.completedTopics / domain.totalTopics) * 100)}
                        text={`${Math.round((domain.completedTopics / domain.totalTopics) * 100)}%`}
                        styles={buildStyles({
                          pathColor: index === 0 ? '#10B981' : index === 1 ? '#F59E0B' : '#6366F1',
                          textColor: 'gray',
                          trailColor: '#E5E7EB',
                        })}
                      />
                    </div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{domain.domainName}</h4>
                    <p className="text-xs text-gray-500">{domain.completedTopics}/{domain.totalTopics} topics</p>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <RecentActivityCard activity={recentActivity} />
          </div>

          {/* Recommended Articles */}
          <RecommendedArticles articles={recommendedArticles} />
        </div>
      </Section>
    </Container>
  );
};

export default Dashboard;