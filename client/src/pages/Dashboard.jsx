import React, { useState, useEffect } from 'react';
import { Container, Section, Grid } from '../components/layout';
import { getAllDomainsProgress, getRecentActivity } from '../services/domainService';
import { getRelativeTime, formatDateTime } from '../utils/timeUtils';
import { fetchArticlesByDomain } from '../services/articleService';
import { Card } from '../components/ui';
import { BookOpenIcon, CubeIcon, DocumentTextIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const progressAnimation = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const StatCard = ({ title, value, icon: Icon }) => (  <motion.div
    whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(126, 87, 194, 0.1)" }}
    transition={{ type: "spring", stiffness: 300 }}
    className="bg-white dark:bg-black rounded-2xl border border-purple-100 dark:border-purple-900 shadow-lg"
  >    
    <Card className="p-5 sm:p-6">
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="p-3 sm:p-4 bg-purple-100 dark:bg-purple-900 rounded-xl flex-shrink-0">
            <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
          </div>
        )}
        <div>
          <div className="flex flex-col gap-1">
            {title.split(' ').map((word, index) => (
              <p key={index} className="text-sm sm:text-base text-purple-600 dark:text-purple-400 leading-tight">
                {word}
              </p>
            ))}
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-2xl sm:text-3xl xl:text-4xl font-bold text-purple-900 dark:text-purple-100 mt-2"
          >
            {value}
          </motion.p>
        </div>
      </div>
    </Card>
  </motion.div>
);

const RecentActivityCard = ({ activity }) => {
  const [showAll, setShowAll] = useState(false);

  // Sort activity by completion time, most recent first
  const sortedActivity = [...activity].sort((a, b) => new Date(b.time) - new Date(a.time));

  return (
    <motion.div
      {...progressAnimation}
      className="h-full"
    >      <Card className="p-4 sm:p-6 bg-white dark:bg-black rounded-2xl border border-purple-100 dark:border-purple-900 shadow-lg h-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base md:text-lg font-medium text-purple-900 dark:text-purple-100">Recent Activity</h3>
          {activity.length > 5 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
            >
              {showAll ? 'Show Less' : 'View All'}
            </button>
          )}
        </div>
        <div className="mt-4 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
          {sortedActivity.length > 0 ? (
            (showAll ? sortedActivity : sortedActivity.slice(0, 5)).map((item) => (              <motion.div 
                key={`${item.domainId}-${item.topicId}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ 
                  backgroundColor: "rgba(126, 87, 194, 0.05)",
                  transition: { duration: 0.2 }
                }}
                className="flex items-start space-x-3 border-b border-purple-50 dark:border-purple-900/50 last:border-0 pb-3 px-2 py-2 rounded-lg cursor-default"
              >
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 mt-2 rounded-full bg-purple-600 dark:bg-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-purple-900 dark:text-purple-100">{item.title}</p>                    <p className="text-xs text-purple-600 dark:text-purple-400 ml-2 whitespace-nowrap">
                      {formatDateTime(item.time)}
                    </p>
                  </div>
                  <p className="text-xs text-purple-600/80 dark:text-purple-400/80 mt-1">
                    in {item.domainName}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-sm text-purple-600 dark:text-purple-400">No recent activity</p>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

const RecommendedArticles = ({ articles }) => (
  <motion.div
    {...progressAnimation}
    className="h-full"
  >      <Card className="p-4 sm:p-6 bg-white dark:bg-black rounded-2xl border border-purple-100 dark:border-purple-900 shadow-lg h-full">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-semibold text-purple-900 dark:text-purple-100">Recommended Articles</h3>
        <span className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 px-2 py-1 rounded-full">
          Top 3
        </span>
      </div>
      <div className="space-y-4">
        {articles.length > 0 ? articles.map((article, index) => (
          <motion.a 
            key={article.id || index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.01 }}
            className="block"
          >
            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-all border border-purple-100/50 dark:border-purple-800/50">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h4 className="text-base font-medium text-purple-900 dark:text-purple-100 mb-2 line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-sm text-purple-600/90 dark:text-purple-400/90 line-clamp-2 mb-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center space-x-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200">
                      {article.source}
                    </span>
                    <span className="text-xs text-purple-600 dark:text-purple-400">{article.readTime}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                    <MapPinIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </div>
            </div>
          </motion.a>
        )) : (
          <div className="text-center py-8">
            <MapPinIcon className="w-8 h-8 mx-auto text-purple-400/50 dark:text-purple-600/50 mb-3" />
            <p className="text-sm text-purple-600 dark:text-purple-400">No recommended articles available</p>
          </div>
        )}
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
        const { domainsProgress, totalTopicsCompleted } = await getAllDomainsProgress();
        setDomainsProgress(domainsProgress);
        setTotalTopicsCompleted(totalTopicsCompleted);
        
        const activity = await getRecentActivity();
        setRecentActivity(activity);
        
        // Get the user's most active domain based on progress
        const mostActiveDomain = [...domainsProgress]
          .sort((a, b) => (b.completedTopics / b.totalTopics) - (a.completedTopics / a.totalTopics))
          [0];
        
        if (mostActiveDomain) {
          // Using articleService to fetch domain-specific articles
          const articles = await fetchArticlesByDomain(mostActiveDomain.domainName);
          setRecommendedArticles(articles.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateOverallProgress = () => {
    if (!domainsProgress.length) return 0;
    const totalCompleted = domainsProgress.reduce((sum, domain) => sum + domain.completedTopics, 0);
    const totalTopics = domainsProgress.reduce((sum, domain) => sum + domain.totalTopics, 0);
    return totalTopics ? Math.round((totalCompleted / totalTopics) * 100) : 0;
  };

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
      <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-900 dark:from-purple-900 dark:to-black">
        <div className="flex justify-center items-center min-h-screen">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-t-2 border-b-2 border-purple-600 dark:border-purple-400 rounded-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-900 dark:from-purple-900 dark:to-black">
      <Container className="px-3 sm:px-4 md:px-6 lg:px-8 max-w-[1920px]">
        <Section className="py-6 sm:py-8 md:py-12">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 md:space-y-12"
          >
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8">
              <div className="xl:col-span-4 order-2 xl:order-1">
                <motion.div 
                  {...progressAnimation}
                  className="mb-8 text-center xl:text-left"
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-purple-900 dark:text-purple-100">
                    Progress <span className="mt-4">Dashboard</span> 
                  </h1>
                  <p className="text-xl sm:text-2xl text-purple-600 dark:text-purple-400 mb-8 md:mb-12">
                    Track your learning progress and explore recommended content
                  </p>
                </motion.div>

                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                  ))}
                </div>
              </div>

              <div className="xl:col-span-8 order-1 xl:order-2">
                <motion.div {...progressAnimation}>
                  <Card className="p-4 sm:p-6 md:p-8 rounded-2xl bg-white dark:bg-black border border-purple-100 dark:border-purple-900 shadow-lg">
                    <h3 className="text-xl md:text-2xl font-semibold text-purple-900 dark:text-purple-100 mb-6 md:mb-8">Domain Progress</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {getTopDomains().map((domain, index) => (
                        <motion.div 
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          className="flex flex-col items-center bg-purple-50 dark:bg-purple-900/20 p-4 sm:p-6 rounded-xl"
                        >
                          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-4">
                            <CircularProgressbar
                              value={Math.round((domain.completedTopics / domain.totalTopics) * 100)}
                              text={`${Math.round((domain.completedTopics / domain.totalTopics) * 100)}%`}
                              styles={buildStyles({
                                pathColor: '#7E57C2',
                                textColor: '#7E57C2',
                                trailColor: '#E6E6FA',
                              })}
                            />
                          </div>
                          <h4 className="text-sm font-medium text-center text-purple-900 dark:text-purple-100">{domain.domainName}</h4>
                          <p className="text-xs text-purple-600 dark:text-purple-400">{domain.completedTopics}/{domain.totalTopics} topics</p>
                        </motion.div>
                      ))}
                    </div>
                  </Card>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6">
                    <RecentActivityCard activity={recentActivity} />
                    <RecommendedArticles articles={recommendedArticles} />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Section>
      </Container>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <button className="bg-purple-600 hover:bg-purple-700 w-12 h-12 rounded-full flex items-center justify-center transition-colors">
          <MapPinIcon className="w-6 h-6 text-white dark:text-black" />
        </button>
      </motion.div>
    </div>
  );
};

export default Dashboard;