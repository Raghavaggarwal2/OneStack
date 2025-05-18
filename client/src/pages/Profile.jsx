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
    <div className="min-h-screen  bg-gradient-to-b from-purple-100 to-purple-900 dark:from-purple-900 dark:to-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-gray-300 dark:bg-black rounded-2xl shadow-xl overflow-hidden">
          {/* Cover Image */}
          <div className="h-32 sm:h-48 bg-gradient-to-r from-purple-700 via-purple-400 to-purple-700"></div>
          
          {/* Profile Info */}
          <div className="relative px-4 sm:px-6 pb-6">
            {/* Avatar */}
            <div className="relative -mt-16 sm:-mt-24 mb-4 flex justify-center">
              <img
                src={user?.profileImage || userData?.profileImage || `https://ui-avatars.com/api/?name=${user?.firstName[0] || userData?.firstName[0]}&size=192&background=random`}
                alt="Profile"
                className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-lg"
              />
            </div>
            
            {/* Name and Email */}
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {userData?.firstName || user?.firstName} {userData?.lastName || user.lastName}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{userData?.email || user.email}</p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {/* Personal Info */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Age</span>
                    <span className="font-medium text-gray-900 dark:text-white">{userData?.age || user?.age || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Gender</span>
                    <span className="font-medium text-gray-900 dark:text-white">{userData?.gender || user?.gender || '-'}</span>
                  </div>
                </div>
              </div>

              {/* Education Info */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Education</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Degree</span>
                    <span className="font-medium text-gray-900 dark:text-white">{userData?.degree || user?.degree || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">University</span>
                    <span className="font-medium text-gray-900 dark:text-white">{userData?.university || user?.university || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Year of Passing</span>
                    <span className="font-medium text-gray-900 dark:text-white">{userData?.yearOfPassing || user?.yearOfPassing || '-'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {(userData?.techStack || user?.techStack || []).length > 0 ? (
                  userData?.techStack.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow"
                    >
                      {tech}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">No tech stack specified</span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <button
                onClick={() => navigate('/profile/edit')}
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700 hover:from-purple-500 hover:to-purple-800 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                <span>Edit Profile</span>
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-medium rounded-xl transition-colors duration-200 space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;