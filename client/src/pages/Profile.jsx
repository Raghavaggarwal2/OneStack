import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const Profile = () => {
  const { theme, toggleTheme } = useTheme();
  
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe',
    joinDate: '2024-01-01',
    completedTopics: 15,
    totalArticlesRead: 25,
    preferences: {
      emailNotifications: true,
      weeklyDigest: true,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  useEffect(() => {
    // TODO: Fetch profile data from API
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Update profile via API
    setProfile(formData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: type === 'checkbox' ? checked : value,
      },
    }));
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg">
        <div className="flex items-center space-x-6">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="h-24 w-24 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{profile.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">{profile.email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Member since {new Date(profile.joinDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Topics Completed</h2>
          <p className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            {profile.completedTopics}
          </p>
        </div>

        <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Articles Read</h2>
          <p className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            {profile.totalArticlesRead}
          </p>
        </div>
      </div>

      {/* Settings */}
      <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Settings</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={formData.preferences.emailNotifications}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="weeklyDigest"
                  checked={formData.preferences.weeklyDigest}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <span className="text-gray-700 dark:text-gray-300">Weekly Progress Digest</span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-3">
                <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                <button 
                  type="button"
                  onClick={toggleTheme} 
                  className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 dark:bg-gray-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Toggle dark mode</span>
                  <span
                    aria-hidden="true"
                    className={`${
                      theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  />
                </button>
              </label>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;