import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalArticles: 0,
    totalDomains: 0,
  });

  useEffect(() => {
    // TODO: Fetch admin stats from API
    setStats({
      totalUsers: 150,
      activeUsers: 75,
      totalArticles: 45,
      totalDomains: 8,
    });
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <Link
          to="/admin/content"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Manage Content
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h3 className="text-lg font-medium text-gray-900">Total Users</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {stats.totalUsers}
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h3 className="text-lg font-medium text-gray-900">Active Users</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {stats.activeUsers}
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h3 className="text-lg font-medium text-gray-900">Total Articles</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {stats.totalArticles}
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h3 className="text-lg font-medium text-gray-900">Total Domains</h3>
          <p className="mt-2 text-3xl font-bold text-purple-600">
            {stats.totalDomains}
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <p className="font-medium text-gray-900">New User Registration</p>
              <p className="text-sm text-gray-500">user@example.com</p>
            </div>
            <span className="text-sm text-gray-500">5 minutes ago</span>
          </div>
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <p className="font-medium text-gray-900">New Article Published</p>
              <p className="text-sm text-gray-500">
                "Advanced TypeScript Patterns"
              </p>
            </div>
            <span className="text-sm text-gray-500">1 hour ago</span>
          </div>
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <p className="font-medium text-gray-900">Domain Updated</p>
              <p className="text-sm text-gray-500">Frontend Development</p>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <button className="flex items-center justify-between rounded-lg bg-indigo-50 p-6 text-left hover:bg-indigo-100">
          <div>
            <h3 className="text-lg font-medium text-indigo-900">
              Create New Article
            </h3>
            <p className="text-sm text-indigo-700">
              Add new content to the platform
            </p>
          </div>
          <span className="text-2xl">+</span>
        </button>

        <button className="flex items-center justify-between rounded-lg bg-purple-50 p-6 text-left hover:bg-purple-100">
          <div>
            <h3 className="text-lg font-medium text-purple-900">
              Manage Domains
            </h3>
            <p className="text-sm text-purple-700">
              Edit or create learning domains
            </p>
          </div>
          <span className="text-2xl">→</span>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard; 