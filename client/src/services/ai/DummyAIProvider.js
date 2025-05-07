/**
 * Dummy AI provider for testing without actual API integration
 */

const DummyAIProvider = {
  // Default responses for common tech questions
  responses: {
    javascript: "JavaScript is a high-level programming language that follows the ECMAScript standard. It's primarily used for web development to create interactive elements.",
    python: "Python is a high-level, interpreted programming language known for its readability and versatility. It's widely used in data science, web development, and automation.",
    react: "React is a JavaScript library developed by Facebook for building user interfaces, particularly single-page applications. It uses a component-based architecture and virtual DOM for efficient rendering.",
    datastructure: "Data structures are specialized formats for organizing and storing data. Common examples include arrays, linked lists, stacks, queues, trees, and graphs.",
    algorithm: "Algorithms are step-by-step procedures or formulas for solving problems. In computer science, they form the foundation for efficient data processing and computation.",
  },
  
  initialize() {
    // No configuration needed for dummy provider
    console.log("Dummy AI provider initialized");
  },
  
  async getCompletion(messages) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get the last user message
    const userMessage = messages.find(msg => msg.role === 'user')?.content || '';
    const lowerUserMessage = userMessage.toLowerCase();
    
    // Check for keyword matches
    for (const [keyword, response] of Object.entries(this.responses)) {
      if (lowerUserMessage.includes(keyword)) {
        return response;
      }
    }
    
    // Default response for other tech queries
    return "This is a dummy AI response. In production, this would be replaced with a response from an actual AI service. I'm here to help with your tech-related questions!";
  }
};

export default DummyAIProvider;
