import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { register, isAuthenticated } = useAuth();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98 },
    initial: { scale: 1 }
  };

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      const destination = location.state?.from?.pathname || '/dashboard';
      navigate(destination);
    }
  }, [isAuthenticated, navigate, location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 10) {
      newErrors.password = 'Password must be at least 10 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    
    try {
      const result = await register(formData);
      
      if (!result.success) {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          throw new Error(result.error);
        }
      }
      
      // Redirect will happen in useEffect
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-purple-300 to-purple-500 dark:from-purple-900 dark:via-purple-700 dark:to-purple-800 transition-colors duration-700">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-black/10 backdrop-blur-sm"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() + 0.5],
              opacity: [0.3, 0.7]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-lg"
        >
          <motion.div
            className="backdrop-blur-lg bg-white/10 dark:bg-black/10 rounded-2xl shadow-2xl p-8 border border-white/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo and Title */}
            <motion.div variants={itemVariants} className="text-center mb-8">
              <img
                src="/logo.svg"
                alt="OneStack Logo"
                className="mx-auto h-28 w-auto mb-1 drop-shadow-xl"
              />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 dark:from-white dark:to-gray-100 bg-clip-text text-transparent">
                Create Your Account
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-white/80">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="font-medium text-purple-600 hover:text-purple-800 dark:text-white dark:hover:text-purple-200 underline decoration-2 decoration-purple-500/50 underline-offset-4 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>

            {/* Error Alert */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg mb-6"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </motion.div>
            )}

            <motion.form
              variants={containerVariants}
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/90">
                    First name
                  </label>
                  <div className="relative group">
                    <input
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 focus:border-purple-500 dark:focus:border-white/20 text-gray-900 dark:text-white rounded-xl backdrop-blur-sm focus:ring-2 focus:ring-purple-500 dark:focus:ring-white/20 transition-all outline-none placeholder:text-gray-400 dark:placeholder:text-white/50"
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName}</p>
                    )}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur"></div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/90">
                    Last name
                  </label>
                  <div className="relative group">
                    <input
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 focus:border-purple-500 dark:focus:border-white/20 text-gray-900 dark:text-white rounded-xl backdrop-blur-sm focus:ring-2 focus:ring-purple-500 dark:focus:ring-white/20 transition-all outline-none placeholder:text-gray-400 dark:placeholder:text-white/50"
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>
                    )}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur"></div>
                  </div>
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-white/90">
                  Email address
                </label>
                <div className="relative group">
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 focus:border-purple-500 dark:focus:border-white/20 text-gray-900 dark:text-white rounded-xl backdrop-blur-sm focus:ring-2 focus:ring-purple-500 dark:focus:ring-white/20 transition-all outline-none placeholder:text-gray-400 dark:placeholder:text-white/50"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                  )}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur"></div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-white/90">
                  Password
                </label>
                <div className="relative group">
                  <input
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 focus:border-purple-500 dark:focus:border-white/20 text-gray-900 dark:text-white rounded-xl backdrop-blur-sm focus:ring-2 focus:ring-purple-500 dark:focus:ring-white/20 transition-all outline-none placeholder:text-gray-400 dark:placeholder:text-white/50"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                  )}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur"></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Must be at least 10 characters</p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-white/90">
                  Confirm password
                </label>
                <div className="relative group">
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 focus:border-purple-500 dark:focus:border-white/20 text-gray-900 dark:text-white rounded-xl backdrop-blur-sm focus:ring-2 focus:ring-purple-500 dark:focus:ring-white/20 transition-all outline-none placeholder:text-gray-400 dark:placeholder:text-white/50"
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
                  )}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur"></div>
                </div>
              </motion.div>

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                initial="initial"
                type="submit"
                disabled={loading}
                className="relative w-full group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                <div className="relative flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl leading-none">
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <span className="text-white font-semibold">Create Account</span>
                  )}
                </div>
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;