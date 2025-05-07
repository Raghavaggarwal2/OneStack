import React, { useEffect, useState } from "react";
import Card from "./ui/Card";
import { getRecentActivity } from "../services/domainService";

const RecentActivitySection = () => {
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        const activity = await getRecentActivity();
        setRecentActivity(activity.slice(0, 3));
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
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 dark:text-red-400">{error}</div>
      ) : (
        <div className="space-y-4">
          {recentActivity.length > 0 ? (
            recentActivity.map((activity) => (
              <div 
                key={`${activity.domainId}-${activity.topicId}`} 
                className="border-b dark:border-gray-700 pb-3 last:border-0"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">{activity.title}</span>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {new Date(activity.time).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No recent activity to show.</p>
          )}
        </div>
      )}
    </Card>
  );
};

export default RecentActivitySection;