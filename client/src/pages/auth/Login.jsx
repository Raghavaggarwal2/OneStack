import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
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

  useEffect(() => {
    if (isAuthenticated) {
      const destination = location.state?.from?.pathname || '/dashboard';
      navigate(destination);
    }
  }, [isAuthenticated, navigate, location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await login(formData.email, formData.password);
      if (!result.success) {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">      {/* Animated background */}
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
          className="w-full max-w-md"
white        >          <motion.div
            className="backdrop-blur-lg bg-white/10 dark:bg-black/10 rounded-2xl shadow-2xl p-8 border border-white/20"
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
              />              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 dark:from-white dark:to-gray-100 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-white/80">
                New to OneStack?{' '}
                <Link 
                  to="/register" 
                  className="font-medium text-purple-600 hover:text-purple-800 dark:text-white dark:hover:text-purple-200 underline decoration-2 decoration-purple-500/50 underline-offset-4 transition-colors"
                >
                  Create an account
                </Link>
              </p>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 text-white px-4 py-3 rounded-lg mb-6"
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
              <motion.div variants={itemVariants} className="space-y-2">                <label className="block text-sm font-medium text-gray-700 dark:text-white/90">
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
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur"></div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">                <label className="block text-sm font-medium text-gray-700 dark:text-white/90">
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
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-6-- rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                <div className="relative flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl leading-none">
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <span className="text-white font-semibold">Sign In</span>
                  )}
                </div>
              </motion.button>

              <motion.div 
                variants={itemVariants}
                className="text-center mt-4"
              >
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-white/70 dark:hover:text-white transition-colors"
                >
                  Forgot your password?
                </Link>
              </motion.div>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;