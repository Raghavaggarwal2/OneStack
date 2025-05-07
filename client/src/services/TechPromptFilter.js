/**
 * A service to determine if a user query is tech-related
 */

const TechPromptFilter = {
  /**
   * List of tech-related keywords to check against
   */
  techKeywords: [
    // Programming languages and frameworks
    'javascript', 'python', 'java', 'c++', 'ruby', 'php', 'go', 'rust', 'scala', 'kotlin',
    'react', 'angular', 'vue', 'node', 'express', 'django', 'flask', 'spring', 'laravel',
    'typescript', 'swift', 'objective-c', 'r', 'matlab', 'perl', 'html', 'css', 'sass',
    
    // Tech domains and concepts from domains list
    'dsa', 'data structure', 'algorithm', 'aptitude', 'data science', 'machine learning',
    'genai', 'generative ai', 'aiml', 'artificial intelligence', 'devops', 'cloud computing',
    'blockchain', 'cyber security', 'android', 'ios', 'web dev', 'game dev', 'ui/ux',
    'ethical hacking', 'web3', 'iot', 'vlsi', 'frontend', 'backend', 'fullstack',
    
    // Development tools and technologies
    'git', 'github', 'gitlab', 'bitbucket', 'docker', 'kubernetes', 'aws', 'azure',
    'gcp', 'database', 'sql', 'nosql', 'mongodb', 'postgresql', 'mysql', 'redis',
    'api', 'rest', 'graphql', 'microservices', 'serverless', 'cicd', 'jenkins',
    
    // Common technical terms
    'code', 'programming', 'develop', 'software', 'app', 'application', 'website', 
    'server', 'client', 'debug', 'error', 'exception', 'function', 'class', 'interface',
    'method', 'variable', 'array', 'object', 'string', 'integer', 'boolean', 'compiler',
    'interpreter', 'runtime', 'framework', 'library', 'package', 'module', 'dependency',
    'bug', 'fix', 'solution', 'engineer', 'architecture', 'pattern', 'design',
    
    // Hardware and systems
    'computer', 'processor', 'cpu', 'gpu', 'ram', 'memory', 'storage', 'hardware',
    'software', 'operating system', 'linux', 'windows', 'macos', 'unix', 'network',
    'protocol', 'ip', 'tcp', 'dns', 'http', 'https', 'ssh', 'ftp', 'firewall'
  ],

  /**
   * Determine if a query is tech-related
   * @param {string} query - The user query to check
   * @returns {boolean} - True if the query is tech-related, false otherwise
   */
  isTechRelated(query) {
    if (!query) return false;
    
    // Convert query to lowercase for case-insensitive matching
    const lowerQuery = query.toLowerCase();
    
    // Check if query contains any tech keywords
    return this.techKeywords.some(keyword => lowerQuery.includes(keyword));
  },

  /**
   * Get a gentle rejection message for non-tech queries
   * @returns {string} - A message indicating the bot only handles tech queries
   */
  getNonTechReplyMessage() {
    const messages = [
      "I'm designed to help with technical questions related to software development, computer science, and technology domains. Could you please ask me something tech-related?",
      "I specialize in answering technical questions. If you're looking for information about programming, software, or tech domains, I'd be happy to help!",
      "I'm a tech-focused assistant. I can help with coding, technology, and computer science questions. How can I assist you with something in tech?",
      "My expertise is limited to technology topics. Please feel free to ask about programming, software engineering, or any tech-related topics.",
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
  }
};

export default TechPromptFilter;
