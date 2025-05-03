import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import Card from "./ui/Card";

const RecentActivitySection = () => {
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        const response = await fetch("/api/recent-activity");
        if (!response.ok) {
          throw new Error("Failed to fetch recent activity");
        }
        const data = await response.json();
        setRecentActivity(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentActivity();
  }, []);

  return (
    <Card>
      <h3 className="text-xl font-semibold mb-4 dark:text-gray-200">Recent Activity</h3>
      
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="loader"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 dark:text-red-400">{error}</div>
      ) : (
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity._id} className="border-b dark:border-gray-700 pb-3 last:border-0">
              <Link 
                to={`/profile/${activity.user._id}`}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                {activity.user.username}
              </Link>
              <span className="text-gray-600 dark:text-gray-400"> {activity.action} </span>
              
              {activity.questionId ? (
                <Link 
                  to={`/questions/${activity.questionId._id}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {activity.questionId.title}
                </Link>
              ) : (
                <span className="italic text-gray-500 dark:text-gray-500">deleted content</span>
              )}
              
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!loading && !error && recentActivity.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No recent activity to show.</p>
      )}
    </Card>
  );
};

export default RecentActivitySection;