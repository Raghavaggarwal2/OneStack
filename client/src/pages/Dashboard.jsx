import React, { useState, useEffect } from 'react';
import { Container, Section, Grid } from '../components/layout';
import { getAllDomainsProgress } from '../services/domainService';
import { Card } from '../components/ui';
import ProgressBar from '../components/ui/ProgressBar';
import { BookOpenIcon, CubeIcon, DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline';

const StatCard = ({ title, value, icon: Icon, trend }) => (
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
    {trend && (
      <p className={`mt-2 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
      </p>
    )}
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

const Dashboard = () => {
  const [domainsProgress, setDomainsProgress] = useState([]);
  const [totalTopicsCompleted, setTotalTopicsCompleted] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const { domainsProgress, totalTopicsCompleted } = await getAllDomainsProgress();
        setDomainsProgress(domainsProgress);
        setTotalTopicsCompleted(totalTopicsCompleted);
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
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
      icon: BookOpenIcon, 
      trend: 12 
    },
    { 
      title: 'Active Domains', 
      value: domainsProgress.length.toString(), 
      icon: CubeIcon, 
      trend: -2 
    },
    { 
      title: 'Topics Completed', 
      value: totalTopicsCompleted.toString(), 
      icon: DocumentTextIcon, 
      trend: 8 
    },
    { 
      title: 'Time Spent', 
      value: '12h', 
      icon: ClockIcon, 
      trend: 15 
    },
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

          <Card className="p-6">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Overall Progress</h3>
            <ProgressBar
              progress={calculateOverallProgress()}
              size="lg"
              color="primary"
              label="Learning Progress"
              className="mb-6"
            />
            <Grid cols={{ base: 1, md: 3 }} gap={4}>
              {getTopDomains().map((domain, index) => (
                <div key={index}>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">{domain.domainName}</h4>
                  <ProgressBar 
                    progress={Math.round((domain.completedTopics / domain.totalTopics) * 100)} 
                    size="sm" 
                    color={index === 0 ? 'success' : index === 1 ? 'warning' : 'secondary'} 
                  />
                </div>
              ))}
            </Grid>
          </Card>
        </div>
      </Section>
    </Container>
  );
};

export default Dashboard;