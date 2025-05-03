import React from 'react';
import { Container, Grid, Section } from '../components/layout';
import { Card, ProgressBar, Button } from '../components/ui';

const DomainCard = ({ domain }) => (
  <Card hover className="h-full">
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-indigo-50">
          <domain.icon className="w-6 h-6 text-indigo-600" />
        </div>
        <Button
          variant={domain.enrolled ? 'outline' : 'primary'}
          size="sm"
        >
          {domain.enrolled ? 'Continue' : 'Start Learning'}
        </Button>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {domain.name}
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        {domain.description}
      </p>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-500">Progress</span>
            <span className="text-sm font-medium text-gray-900">{domain.progress}%</span>
          </div>
          <ProgressBar
            progress={domain.progress}
            size="sm"
            color={domain.progress >= 70 ? 'success' : 'primary'}
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-gray-500">{domain.modules} modules</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-500">{domain.duration} hours</span>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

const Domains = () => {
  // Mock data - replace with real data from your API
  const domains = [
    {
      id: 1,
      name: 'Frontend Development',
      description: 'Master modern frontend technologies and frameworks',
      icon: (props) => (
        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      progress: 75,
      modules: 12,
      duration: 24,
      enrolled: true,
    },
    {
      id: 2,
      name: 'Backend Development',
      description: 'Build scalable and secure backend applications',
      icon: (props) => (
        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      progress: 45,
      modules: 10,
      duration: 20,
      enrolled: true,
    },
    {
      id: 3,
      name: 'DevOps & Cloud',
      description: 'Learn modern DevOps practices and cloud platforms',
      icon: (props) => (
        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      progress: 30,
      modules: 8,
      duration: 16,
      enrolled: true,
    },
    {
      id: 4,
      name: 'Database Management',
      description: 'Master database design and management',
      icon: (props) => (
        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      progress: 0,
      modules: 6,
      duration: 12,
      enrolled: false,
    },
    {
      id: 5,
      name: 'Mobile Development',
      description: 'Build native and cross-platform mobile apps',
      icon: (props) => (
        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      progress: 0,
      modules: 10,
      duration: 20,
      enrolled: false,
    },
    {
      id: 6,
      name: 'Machine Learning',
      description: 'Get started with machine learning and AI',
      icon: (props) => (
        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      progress: 0,
      modules: 8,
      duration: 16,
      enrolled: false,
    },
  ];

  const enrolledDomains = domains.filter(domain => domain.enrolled);
  const availableDomains = domains.filter(domain => !domain.enrolled);

  return (
    <Container>
      {/* Enrolled Domains */}
      <Section
        title="My Learning Domains"
        description="Track your progress in enrolled domains"
        className="mb-12"
      >
        <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {enrolledDomains.map(domain => (
            <DomainCard key={domain.id} domain={domain} />
          ))}
        </Grid>
      </Section>

      {/* Available Domains */}
      <Section
        title="Available Domains"
        description="Explore new learning opportunities"
      >
        <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {availableDomains.map(domain => (
            <DomainCard key={domain.id} domain={domain} />
          ))}
        </Grid>
      </Section>
    </Container>
  );
};

export default Domains; 