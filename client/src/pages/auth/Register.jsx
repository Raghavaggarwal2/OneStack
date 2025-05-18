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
      {/* Animated background with floating elements */}
      <div className="absolute inset-0 bg-gradient-to-bl from-purple-100 via-purple-300 to-purple-500 dark:from-purple-900 dark:via-purple-700 dark:to-purple-800 transition-colors duration-700">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-black/10 backdrop-blur-sm"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() + 0.5],
              opacity: [0.2, 0.5]
            }}
            transition={{
              duration: Math.random() * 10 + 15,
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
            className="backdrop-blur-lg bg-white/90 dark:bg-black/10 rounded-2xl shadow-2xl p-8 border border-gray-200/20 dark:border-white/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo and Title */}
            <motion.div variants={itemVariants} className="text-center mb-8">
              <img
                src="/logo.png"
                alt="OneStack Logo"
                className="mx-auto h-28 w-auto mb-1 drop-shadow-xl"
              />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 dark:from-white dark:to-gray-100 bg-clip-text text-transparent">
                Join OneStack
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-white/80">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="font-medium text-purple-600 hover:text-purple-500 dark:text-white dark:hover:text-purple-200 underline decoration-2 decoration-purple-500/50 underline-offset-4 transition-colors"
                >
                  Sign in instead
                </Link>
              </p>
            </motion.div>

            {/* Error Alert */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-500/10 backdrop-blur-sm border border-red-200 dark:border-red-500/20 text-red-600 dark:text-white px-4 py-3 rounded-lg mb-6"
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
              {/* Name Fields */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/90">
                    First Name
                  </label>
                  <div className="relative group">
                    <input
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 focus:border-purple-500 dark:focus:border-white/20 text-gray-900 dark:text-white rounded-xl backdrop-blur-sm focus:ring-2 focus:ring-purple-500 dark:focus:ring-white/20 transition-all outline-none placeholder:text-gray-400 dark:placeholder:text-white/50"
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <span className="text-xs text-red-500 dark:text-red-300 mt-1">{errors.firstName}</span>
                    )}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/90">
                    Last Name
                  </label>
                  <div className="relative group">
                    <input
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 focus:border-purple-500 dark:focus:border-white/20 text-gray-900 dark:text-white rounded-xl backdrop-blur-sm focus:ring-2 focus:ring-purple-500 dark:focus:ring-white/20 transition-all outline-none placeholder:text-gray-400 dark:placeholder:text-white/50"
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <span className="text-xs text-red-500 dark:text-red-300 mt-1">{errors.lastName}</span>
                    )}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur"></div>
                  </div>
                </div>
              </motion.div>

              {/* Email Field */}
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
                    placeholder="johndoe@example.com"
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500 dark:text-red-300 mt-1">{errors.email}</span>
                  )}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur"></div>
                </div>
              </motion.div>

              {/* Password Fields */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
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
                      placeholder="••••••••"
                    />
                    {errors.password && (
                      <span className="text-xs text-red-500 dark:text-red-300 mt-1">{errors.password}</span>
                    )}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/90">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <input
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 focus:border-purple-500 dark:focus:border-white/20 text-gray-900 dark:text-white rounded-xl backdrop-blur-sm focus:ring-2 focus:ring-purple-500 dark:focus:ring-white/20 transition-all outline-none placeholder:text-gray-400 dark:placeholder:text-white/50"
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && (
                      <span className="text-xs text-red-500 dark:text-red-300 mt-1">{errors.confirmPassword}</span>
                    )}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur"></div>
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;