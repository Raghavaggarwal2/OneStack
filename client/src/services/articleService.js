/**
 * Article Service - Handles fetching articles from multiple APIs
 */

// Tech domain keywords mapping (comprehensive version)
export const techDomains = {
  // DSA
  'dsa': 'DSA',
  'algorithm': 'DSA',
  'data structure': 'DSA',
  'sorting': 'DSA',
  'binary search': 'DSA',
  'tree': 'DSA',
  'graph': 'DSA',
  'hashmap': 'DSA',
  'heap': 'DSA',
  
  // Aptitude
  'aptitude': 'Aptitude',
  'reasoning': 'Aptitude',
  'quantitative': 'Aptitude',
  'logical reasoning': 'Aptitude',
  'math problem': 'Aptitude',
  
  // Data Science
  'data science': 'Data Science',
  'big data': 'Data Science',
  'analytics': 'Data Science',
  'data analysis': 'Data Science',
  'pandas': 'Data Science',
  'numpy': 'Data Science',
  'jupyter': 'Data Science',
  'tableau': 'Data Science',
  'data visualization': 'Data Science',
  
  // GenAI
  'genai': 'GenAI',
  'generative ai': 'GenAI',
  'gpt': 'GenAI',
  'stable diffusion': 'GenAI',
  'midjourney': 'GenAI',
  'dall-e': 'GenAI',
  'llm': 'GenAI',
  'large language model': 'GenAI',
  'diffusion model': 'GenAI',
  
  // AIML
  'ai': 'AIML',
  'machine learning': 'AIML',
  'artificial intelligence': 'AIML',
  'neural network': 'AIML',
  'deep learning': 'AIML',
  'tensorflow': 'AIML',
  'pytorch': 'AIML',
  'scikit-learn': 'AIML',
  
  // DevOps
  'devops': 'DevOps',
  'cicd': 'DevOps',
  'continuous integration': 'DevOps',
  'deployment': 'DevOps',
  'jenkins': 'DevOps',
  'github actions': 'DevOps',
  'gitlab ci': 'DevOps',
  'terraform': 'DevOps',
  'ansible': 'DevOps',
  
  // Cloud Computing
  'cloud': 'Cloud Computing',
  'aws': 'Cloud Computing',
  'azure': 'Cloud Computing',
  'google cloud': 'Cloud Computing',
  'serverless': 'Cloud Computing',
  'lambda': 'Cloud Computing',
  'ec2': 'Cloud Computing',
  's3': 'Cloud Computing',
  
  // Blockchain
  'blockchain': 'Blockchain',
  'crypto': 'Blockchain',
  'nft': 'Blockchain',
  'ethereum': 'Blockchain',
  'bitcoin': 'Blockchain',
  'solidity': 'Blockchain',
  'smart contract': 'Blockchain',
  
  // Web 3
  'web3': 'Web 3',
  'decentralized': 'Web 3',
  'dao': 'Web 3',
  'defi': 'Web 3',
  
  // Cyber Security
  'security': 'Cyber Security',
  'cyber': 'Cyber Security',
  'encryption': 'Cyber Security',
  'firewall': 'Cyber Security',
  'vulnerability': 'Cyber Security',
  'authentication': 'Cyber Security',
  
  // Ethical Hacking
  'hacking': 'Ethical Hacking',
  'ethical hacking': 'Ethical Hacking',
  'penetration testing': 'Ethical Hacking',
  'kali': 'Ethical Hacking',
  'metasploit': 'Ethical Hacking',
  'exploit': 'Ethical Hacking',
  
  // Android Dev
  'android': 'Android Dev',
  'android dev': 'Android Dev',
  'kotlin': 'Android Dev',
  'android studio': 'Android Dev',
  'jetpack compose': 'Android Dev',
  
  // iOS Dev
  'ios': 'iOS Dev',
  'swift': 'iOS Dev',
  'ios dev': 'iOS Dev',
  'objective-c': 'iOS Dev',
  'xcode': 'iOS Dev',
  'swiftui': 'iOS Dev',
  
  // Web Dev
  'web': 'Web Dev',
  'javascript': 'Web Dev',
  'html': 'Web Dev',
  'css': 'Web Dev',
  'react': 'Web Dev',
  'vue': 'Web Dev',
  'angular': 'Web Dev',
  'node': 'Web Dev',
  
  // Game Dev
  'game': 'Game Dev',
  'unity': 'Game Dev',
  'unreal': 'Game Dev',
  'gamedev': 'Game Dev',
  'game engine': 'Game Dev',
  'game design': 'Game Dev',
  
  // UI/UX
  'ui': 'UI/UX',
  'ux': 'UI/UX',
  'design': 'UI/UX',
  'interface': 'UI/UX',
  'figma': 'UI/UX',
  'prototype': 'UI/UX',
  'wireframe': 'UI/UX',
  
  // IOT
  'iot': 'IOT',
  'internet of things': 'IOT',
  'embedded': 'IOT',
  'arduino': 'IOT',
  'raspberry pi': 'IOT',
  'sensor': 'IOT',
  
  // VLSI
  'vlsi': 'VLSI',
  'chip': 'VLSI',
  'semiconductor': 'VLSI',
  'verilog': 'VLSI',
  'hdl': 'VLSI',
  'asic': 'VLSI',
  'fpga': 'VLSI'
};

// Enhanced data science keywords
const dataScienceKeywords = [
  'data science', 'machine learning', 'statistics', 'python', 'r language',
  'pandas', 'numpy', 'scikit-learn', 'tensorflow', 'pytorch', 'deep learning',
  'neural networks', 'big data', 'data mining', 'data visualization', 'tableau',
  'power bi', 'analytics', 'predictive modeling', 'regression', 'classification',
  'clustering', 'nlp', 'natural language processing', 'computer vision',
  'time series', 'forecasting', 'feature engineering', 'dimensionality reduction'
];

// List of domains for filter dropdown
export const domainList = [
  'DSA', 
  'Aptitude', 
  'Data Science', 
  'GenAI', 
  'AIML', 
  'DevOps', 
  'Cloud Computing', 
  'Blockchain', 
  'Cyber Security', 
  'Android Dev',
  'iOS Dev', 
  'Web Dev', 
  'Game Dev', 
  'UI/UX', 
  'Ethical Hacking',
  'Web 3', 
  'IOT', 
  'VLSI'
];

// Determine domain from article content
export const determineDomain = (article) => {
  if (!article) return 'Technology';
  
  const title = (article.title || '').toLowerCase();
  const text = (article.text || '').toLowerCase();
  const url = (article.url || '').toLowerCase();
  const description = (article.description || '').toLowerCase();
  const tags = (article.tags || []).join(' ').toLowerCase();
  
  const contentToCheck = title + ' ' + text + ' ' + url + ' ' + description + ' ' + tags;
  
  for (const [keyword, domain] of Object.entries(techDomains)) {
    if (contentToCheck.includes(keyword)) {
      return domain;
    }
  }
  
  // If no specific domain is found, try to make an educated guess
  if (contentToCheck.match(/\b(code|coding|programming|developer|software)\b/i)) {
    return 'Web Dev';
  }
  
  return 'Technology';
};

// Function to estimate read time based on content length
export const estimateReadTime = (content = '') => {
  if (!content) return 1;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 225);
  return minutes > 0 ? minutes : 1;
};

// Fetch articles from Hacker News
export const fetchHackerNews = async (limit = 30) => {
  try {
    const topStoriesResponse = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    if (!topStoriesResponse.ok) throw new Error('Failed to fetch top stories');
    const storyIds = await topStoriesResponse.json();
    
    const articlePromises = storyIds.slice(0, limit).map(id => 
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then(res => res.json())
    );
    
    const articleData = await Promise.all(articlePromises);
    
    return articleData
      .filter(item => item && item.title && !item.dead && !item.deleted)
      .map(item => ({
        id: `hn-${item.id}`,
        title: item.title,
        excerpt: item.text || item.url || 'No description available',
        author: item.by || 'Unknown Author',
        readTime: `${estimateReadTime(item.title + (item.text || ''))} min`,
        domain: determineDomain(item),
        date: item.time ? new Date(item.time * 1000).toISOString() : new Date().toISOString(),
        url: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
        source: 'Hacker News'
      }));
  } catch (err) {
    console.error('Error fetching from Hacker News:', err);
    return [];
  }
};

// Fetch articles from DEV.to
export const fetchDevTo = async (limit = 30) => {
  try {
    const response = await fetch(`https://dev.to/api/articles?top=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch from DEV.to');
    const data = await response.json();
    
    return data.map(item => ({
      id: `devto-${item.id}`,
      title: item.title,
      excerpt: item.description || 'No description available',
      author: item.user?.name || 'DEV.to Author',
      readTime: `${estimateReadTime(item.title + (item.description || ''))} min`,
      domain: determineDomain({
        title: item.title,
        text: item.description,
        tags: item.tags || []
      }),
      date: item.published_at || new Date().toISOString(),
      url: item.url || `https://dev.to${item.path}`,
      source: 'DEV.to',
      cover_image: item.cover_image
    }));
  } catch (err) {
    console.error('Error fetching from DEV.to:', err);
    return [];
  }
};

// Fetch articles from Medium
export const fetchMedium = async () => {
  // Medium doesn't offer a direct API, but we can use RSS feeds and a proxy
  try {
    const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/topic/technology');
    if (!response.ok) throw new Error('Failed to fetch from Medium');
    const data = await response.json();
    
    if (data.status !== 'ok') throw new Error('Invalid RSS feed');
    
    return data.items.map(item => {
      // Extract text content from HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = item.description;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      
      return {
        id: `medium-${item.guid || Math.random().toString(36).substring(2, 15)}`,
        title: item.title,
        excerpt: textContent.substring(0, 150) + '...',
        author: item.author || 'Medium Author',
        readTime: `${estimateReadTime(item.title + textContent)} min`,
        domain: determineDomain({
          title: item.title,
          text: textContent,
          categories: item.categories
        }),
        date: item.pubDate || new Date().toISOString(),
        url: item.link,
        source: 'Medium',
        cover_image: item.thumbnail
      };
    });
  } catch (err) {
    console.error('Error fetching from Medium:', err);
    return [];
  }
};

// Fetch articles from Reddit (tech subreddits)
export const fetchReddit = async () => {
  const techSubreddits = [
    'programming', 'webdev', 'datascience', 'machinelearning',
    'artificial', 'devops', 'aws', 'cybersecurity', 'gamedev'
  ];
  
  try {
    // Choose a random subreddit
    const randomSubreddit = techSubreddits[Math.floor(Math.random() * techSubreddits.length)];
    const response = await fetch(`https://www.reddit.com/r/${randomSubreddit}/top.json?limit=15`);
    if (!response.ok) throw new Error('Failed to fetch from Reddit');
    const data = await response.json();
    
    return data.data.children
      .filter(post => !post.data.is_self || post.data.selftext)
      .map(post => ({
        id: `reddit-${post.data.id}`,
        title: post.data.title,
        excerpt: post.data.selftext 
          ? post.data.selftext.substring(0, 150) + '...'
          : 'Check out this interesting tech article',
        author: post.data.author || 'Reddit User',
        readTime: `${estimateReadTime(post.data.title + (post.data.selftext || ''))} min`,
        domain: determineDomain({
          title: post.data.title,
          text: post.data.selftext,
          url: post.data.url
        }),
        date: new Date(post.data.created * 1000).toISOString(),
        url: `https://reddit.com${post.data.permalink}`,
        source: `Reddit r/${randomSubreddit}`,
        cover_image: post.data.thumbnail !== 'self' && post.data.thumbnail !== 'default' 
          ? post.data.thumbnail 
          : null
      }));
  } catch (err) {
    console.error('Error fetching from Reddit:', err);
    return [];
  }
};

// Fetch articles from GitHub News Feeds
export const fetchGitHub = async () => {
  try {
    const response = await fetch('https://api.github.com/repos/github/explore/contents/topics');
    if (!response.ok) throw new Error('Failed to fetch from GitHub');
    const data = await response.json();
    
    // Extract selected tech topics
    const techTopics = data
      .filter(item => item.name.endsWith('.md'))
      .slice(0, 10);
    
    return techTopics.map(topic => {
      const name = topic.name.replace('.md', '');
      return {
        id: `github-${name}`,
        title: `Trending in ${name.charAt(0).toUpperCase() + name.slice(1)}`,
        excerpt: `Explore trending ${name} projects and resources on GitHub`,
        author: 'GitHub Community',
        readTime: '5 min',
        domain: determineDomain({ title: name }),
        date: new Date().toISOString(),
        url: `https://github.com/topics/${name}`,
        source: 'GitHub Topics',
        cover_image: null
      };
    });
  } catch (err) {
    console.error('Error fetching from GitHub:', err);
    return [];
  }
};

// Add this function to fetch Data Science articles from ArXiv API
export const fetchArxivArticles = async (limit = 10) => {
  try {
    // ArXiv API query for data science related papers
    const query = encodeURIComponent('cat:cs.LG OR cat:stat.ML OR cat:cs.AI OR cat:cs.CL OR cat:cs.CV');
    const url = `https://export.arxiv.org/api/query?search_query=${query}&start=0&max_results=${limit}&sortBy=submittedDate&sortOrder=descending`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch from ArXiv');
    
    const text = await response.text();
    
    // Simple XML parsing (ArXiv uses Atom format)
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");
    const entries = xmlDoc.getElementsByTagName('entry');
    
    const articles = [];
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const title = entry.getElementsByTagName('title')[0]?.textContent || '';
      const summary = entry.getElementsByTagName('summary')[0]?.textContent || '';
      const published = entry.getElementsByTagName('published')[0]?.textContent || '';
      const link = entry.getElementsByTagName('id')[0]?.textContent || '';
      const authors = Array.from(entry.getElementsByTagName('author'))
        .map(author => author.getElementsByTagName('name')[0]?.textContent || '')
        .join(', ');
      
      // Extract categories
      const categories = [];
      const categoryElements = entry.getElementsByTagName('category');
      for (let j = 0; j < categoryElements.length; j++) {
        categories.push(categoryElements[j].getAttribute('term'));
      }
      
      articles.push({
        id: `arxiv-${link.split('/').pop() || Math.random().toString(36).substring(2, 15)}`,
        title: title.trim(),
        excerpt: summary.substring(0, 300) + (summary.length > 300 ? '...' : ''),
        author: authors || 'ArXiv Researcher',
        readTime: `${estimateReadTime(title + summary)} min`,
        domain: 'Data Science',
        date: new Date(published).toISOString(),
        url: link,
        source: 'ArXiv',
        cover_image: null,
        categories: categories
      });
    }
    
    return articles;
  } catch (err) {
    console.error('Error fetching from ArXiv:', err);
    return [];
  }
};

// Add this function to fetch Data Science articles from Kaggle (via RSS)
export const fetchKaggleArticles = async () => {
  try {
    // Using RSS to JSON converter service as Kaggle doesn't have a direct API for articles
    const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.kaggle.com/discussions.rss');
    if (!response.ok) throw new Error('Failed to fetch Kaggle articles');
    
    const data = await response.json();
    if (data.status !== 'ok') throw new Error('Invalid RSS feed');
    
    return data.items
      .filter(item => {
        // Check if the article is related to data science
        const lowerTitle = item.title.toLowerCase();
        const lowerDescription = item.description.toLowerCase();
        return dataScienceKeywords.some(keyword => 
          lowerTitle.includes(keyword) || lowerDescription.includes(keyword)
        );
      })
      .map(item => {
        // Extract content from HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = item.description;
        const textContent = tempDiv.textContent || tempDiv.innerText || '';
        
        return {
          id: `kaggle-${Math.random().toString(36).substring(2, 15)}`,
          title: item.title,
          excerpt: textContent.substring(0, 200) + '...',
          author: item.author || 'Kaggle User',
          readTime: `${estimateReadTime(item.title + textContent)} min`,
          domain: 'Data Science',
          date: item.pubDate || new Date().toISOString(),
          url: item.link,
          source: 'Kaggle',
          cover_image: item.thumbnail || 'https://www.kaggle.com/static/images/site-logo.png'
        };
      });
  } catch (err) {
    console.error('Error fetching from Kaggle:', err);
    return [];
  }
};

// Add this function to fetch Data Science articles from TowardsDataScience via Medium
export const fetchTowardsDataScience = async () => {
  try {
    const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/towards-data-science');
    if (!response.ok) throw new Error('Failed to fetch from Towards Data Science');
    
    const data = await response.json();
    if (data.status !== 'ok') throw new Error('Invalid RSS feed');
    
    return data.items.map(item => {
      // Extract text content from HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = item.description;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      
      return {
        id: `tds-${item.guid || Math.random().toString(36).substring(2, 15)}`,
        title: item.title,
        excerpt: textContent.substring(0, 200) + '...',
        author: item.author || 'Data Science Author',
        readTime: `${estimateReadTime(textContent)} min`,
        domain: 'Data Science',
        date: item.pubDate || new Date().toISOString(),
        url: item.link,
        source: 'Towards Data Science',
        cover_image: item.thumbnail
      };
    });
  } catch (err) {
    console.error('Error fetching from Towards Data Science:', err);
    return [];
  }
};

// Add specialized reddit data science subreddits
export const fetchDataScienceReddit = async (limit = 10) => {
  const dsSubreddits = [
    'datascience', 'MachineLearning', 'dataengineering',
    'rstats', 'learnmachinelearning', 'statistics', 'bigdata'
  ];
  
  try {
    // Choose a random DS subreddit
    const randomSubreddit = dsSubreddits[Math.floor(Math.random() * dsSubreddits.length)];
    const response = await fetch(`https://www.reddit.com/r/${randomSubreddit}/top.json?limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch from Reddit');
    const data = await response.json();
    
    return data.data.children
      .filter(post => !post.data.is_self || post.data.selftext)
      .map(post => ({
        id: `reddit-ds-${post.data.id}`,
        title: post.data.title,
        excerpt: post.data.selftext 
          ? post.data.selftext.substring(0, 150) + '...'
          : 'Check out this data science article',
        author: post.data.author || 'Reddit User',
        readTime: `${estimateReadTime(post.data.title + (post.data.selftext || ''))} min`,
        domain: 'Data Science',
        date: new Date(post.data.created * 1000).toISOString(),
        url: `https://reddit.com${post.data.permalink}`,
        source: `r/${randomSubreddit}`,
        cover_image: post.data.thumbnail !== 'self' && post.data.thumbnail !== 'default' 
          ? post.data.thumbnail 
          : null
      }));
  } catch (err) {
    console.error('Error fetching from Data Science subreddits:', err);
    return [];
  }
};

// Add function to fetch all data science articles
export const fetchDataScienceArticles = async (limit = 20) => {
  try {
    const sources = [
      fetchArxivArticles(limit / 4),
      fetchKaggleArticles(),
      fetchTowardsDataScience(),
      fetchDataScienceReddit(limit / 4)
    ];

    const results = await Promise.allSettled(sources);
    return results
      .filter(result => result.status === 'fulfilled')
      .flatMap(result => result.value)
      .slice(0, limit);
  } catch (err) {
    console.error('Error fetching data science articles:', err);
    return [];
  }
};

// Fetch all articles from multiple sources
export const fetchAllArticles = async () => {
  try {
    const sources = [
      fetchHackerNews(),
      fetchDevTo(),
      fetchMedium(),
      fetchReddit(),
      fetchGitHub(),
      fetchDataScienceArticles(10) // Add data science articles
    ];

    const results = await Promise.allSettled(sources);
    return results
      .filter(result => result.status === 'fulfilled')
      .flatMap(result => result.value);
  } catch (err) {
    console.error('Error fetching all articles:', err);
    return [];
  }
};

// Fetch domain-specific articles by using search terms
export const fetchArticlesByDomain = async (domain) => {
  // Map domains to search keywords to enhance results
  const domainKeywords = {
    'DSA': ['algorithm', 'data structure', 'leetcode'],
    'Aptitude': ['logical reasoning', 'aptitude', 'problem solving'],
    'Data Science': dataScienceKeywords,
    'GenAI': ['generative AI', 'GPT', 'large language model'],
    'AIML': ['machine learning', 'artificial intelligence', 'neural network'],
    'DevOps': ['devops', 'CI/CD', 'deployment', 'docker'],
    'Cloud Computing': ['aws', 'azure', 'cloud', 'serverless'],
    'Blockchain': ['blockchain', 'ethereum', 'web3', 'crypto'],
    'Cyber Security': ['security', 'cybersec', 'infosec'],
    'Android Dev': ['android', 'kotlin', 'mobile development'],
    'iOS Dev': ['swift', 'ios', 'apple development'],
    'Web Dev': ['web development', 'javascript', 'react', 'frontend'],
    'Game Dev': ['game development', 'unity', 'unreal'],
    'UI/UX': ['user interface', 'user experience', 'design'],
    'Ethical Hacking': ['penetration testing', 'ethical hacking', 'security'],
    'Web 3': ['web3', 'dapp', 'decentralized'],
    'IOT': ['internet of things', 'embedded', 'arduino'],
    'VLSI': ['vlsi', 'chip design', 'semiconductor']
  };

  // If requesting data science specifically, prioritize those sources
  if (domain === 'Data Science') {
    try {
      const dsArticles = await fetchDataScienceArticles(15);
      
      // If we got enough data science articles, return them
      if (dsArticles.length >= 10) {
        return dsArticles;
      }
      
      // Otherwise, supplement with general articles that match data science keywords
      const allArticles = await fetchAllArticles();
      const keywordArticles = allArticles.filter(article => {
        // Skip articles we already have
        if (dsArticles.find(a => a.id === article.id)) return false;
        
        const contentToCheck = (article.title + ' ' + article.excerpt).toLowerCase();
        return dataScienceKeywords.some(keyword => contentToCheck.includes(keyword.toLowerCase()));
      });
      
      return [...dsArticles, ...keywordArticles].slice(0, 20);
    } catch (err) {
      console.error('Error fetching data science articles:', err);
      // Fall back to regular domain filtering if there's an error
    }
  }
  
  // For other domains, use the original implementation
  // Get relevant keywords for the requested domain
  const keywords = domainKeywords[domain] || [domain];
  const allArticles = await fetchAllArticles();
  
  // First filter by exact domain match
  let domainArticles = allArticles.filter(article => 
    article.domain.toLowerCase() === domain.toLowerCase());
  
  // If we don't have enough articles, use keywords to find more relevant ones
  if (domainArticles.length < 5) {
    const keywordArticles = allArticles.filter(article => {
      if (domainArticles.find(a => a.id === article.id)) return false; // Skip already included
      
      const contentToCheck = (article.title + ' ' + article.excerpt).toLowerCase();
      return keywords.some(keyword => contentToCheck.includes(keyword.toLowerCase()));
    });
    
    domainArticles = [...domainArticles, ...keywordArticles];
  }
  
  return domainArticles.slice(0, 20); // Limit results
};
