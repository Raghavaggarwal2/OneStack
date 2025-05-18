import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Team = () => {
  const teamMembers = [
    {
      name: 'Laksh Nijhawan',
      githubAvatar: 'https://github.com/laksh2005.png',
      roles: ['Frontend Development', 'Backend Development', 'Research'],
      social: {
        github: 'https://github.com/laksh2005',
        linkedin: 'https://www.linkedin.com/in/laksh-nijhawan-576888280/',
        twitter: 'https://x.com/laksh_2705'
      }
    },
    {
      name: 'Raghav Aggarwal',
      githubAvatar: 'https://github.com/Raghavaggarwal2.png',
      roles: ['Backend Development', 'Research'],
      social: {
        github: 'https://github.com/Raghavaggarwal2',
        linkedin: 'https://www.linkedin.com/in/raghav-aggarwal-375973294/#',
        twitter: 'https://x.com/agg_raghav123'
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const SocialButton = ({ icon: Icon, href, label }) => (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 rounded-full glass-effect text-purple-600 dark:text-purple-400
                hover:text-purple-800 dark:hover:text-purple-200 transition-colors"
      aria-label={label}
    >
      <Icon className="w-6 h-6" />
    </motion.a>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-900 dark:from-purple-900 dark:to-black py-12 px-4 sm:px-6 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 dark:text-purple-100 mb-4">
          Meet Our Team
        </h1>
        <p className="text-lg text-purple-800 dark:text-purple-200 max-w-2xl mx-auto">
          The minds behind OneStack, working together to revolutionize tech education.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
      >
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            variants={cardVariants}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
            <div className="relative glass-morphism rounded-2xl p-8 backdrop-blur-lg">
              <motion.div
                initial={false}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <img
                    src={member.githubAvatar}
                    alt={`${member.name}'s profile`}
                    className="w-32 h-32 mx-auto rounded-[20px] border-4 border-purple-300 dark:border-purple-600 shadow-xl"
                  />
                </motion.div>
                <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-3">
                  {member.name}
                </h2>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {member.roles.map((role) => (
                    <span
                      key={role}
                      className="px-3 py-1 text-sm rounded-full bg-purple-200 dark:bg-purple-800/50 
                               text-purple-800 dark:text-purple-200"
                    >
                      {role}
                    </span>
                  ))}
                </div>

                <div className="flex justify-center space-x-4">
                  <SocialButton icon={FaGithub} href={member.social.github} label="GitHub" />
                  <SocialButton icon={FaLinkedin} href={member.social.linkedin} label="LinkedIn" />
                  <SocialButton icon={FaTwitter} href={member.social.twitter} label="Twitter" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Team;
