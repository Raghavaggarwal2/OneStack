import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="w-10 h-10 rounded-full border-2 border-indigo-500 overflow-hidden focus:outline-none"
        onClick={() => setOpen((prev) => !prev)}
      >
        <img
          src={user?.profileImage || 'https://ui-avatars.com/api/?name=User'}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
          <button
            className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-900"
            onClick={() => { setOpen(false); navigate('/profile'); }}
          >
            View Profile
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-900"
            onClick={() => { setOpen(false); navigate('/profile/edit'); }}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
