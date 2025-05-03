import { useState, useEffect } from 'react';

const Profile = () => {
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
      darkMode: false,
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
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center space-x-6">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="h-24 w-24 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-gray-600">{profile.email}</p>
            <p className="text-sm text-gray-500">
              Member since {new Date(profile.joinDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="text-lg font-medium text-gray-900">Topics Completed</h2>
          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {profile.completedTopics}
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="text-lg font-medium text-gray-900">Articles Read</h2>
          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {profile.totalArticlesRead}
          </p>
        </div>
      </div>

      {/* Settings */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Settings</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
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
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700">Email Notifications</span>
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
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700">Weekly Progress Digest</span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="darkMode"
                  checked={formData.preferences.darkMode}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700">Dark Mode</span>
              </label>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
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