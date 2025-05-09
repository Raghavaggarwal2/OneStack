import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const userData = user.data;
  // console.log(userData)
  // console.log(user)
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-6 mb-8">
        <img
          src={user?.profileImage || userData?.profileImage || `https://ui-avatars.com/api/?name=${userData?.firstName[0]}`}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{userData?.firstName || user?.firstName} {userData?.lastName || user.lastName}</h2>
          <p className="text-gray-600 dark:text-gray-300">{userData?.email || user.email}</p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <span className="font-semibold text-gray-700 dark:text-gray-300">Age:</span>
          <span className="ml-2 text-gray-800 dark:text-white">{userData?.age || user?.age || '-'}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700 dark:text-gray-300">Gender:</span>
          <span className="ml-2 text-gray-800 dark:text-white">{userData?.gender || user?.gender || '-'}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700 dark:text-gray-300">Degree:</span>
          <span className="ml-2 text-gray-800 dark:text-white">{userData?.degree || user?.degree || '-'}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700 dark:text-gray-300">University:</span>
          <span className="ml-2 text-gray-800 dark:text-white">{userData?.university || user?.university || '-'}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700 dark:text-gray-300">Year of Passing:</span>
          <span className="ml-2 text-gray-800 dark:text-white">{userData?.yearOfPassing || user?.yearOfPassing || '-'}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700 dark:text-gray-300">Tech Stack:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {(userData?.techStack || user?.techStack || []).length > 0 ? (
              userData?.techStack.map((tech, idx) => (
                <span key={idx} className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-sm">
                  {tech}
                </span>
              ))
            ) : (
              <span className="text-gray-500">-</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-8 space-x-4">
        <button
          onClick={() => navigate('/profile/edit')}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Edit Profile
        </button>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;