/**
 * A service to build technology-focused prompts for the AI
 */

const TechPromptBuilder = {
  /**
   * System prompt to keep the AI focused on technical information
   */
  systemPrompt: {
    role: 'system',
    content: `You are a specialized technical assistant for OneStack, a programming and tech learning platform.
      
    RULES:
    1. Only answer questions related to programming, software development, computer science, and technology domains.
    2. If asked about non-technical topics, politely redirect to tech topics.
    3. Keep answers concise, technical, and educational.
    4. Focus on factual information rather than opinions.
    5. When providing code examples, ensure they are correct and well-explained.
    6. Be especially knowledgeable about: DSA, Web Development, Data Science, Machine Learning, DevOps, 
       Blockchain, Cyber Security, Mobile Development, UI/UX, and other tech domains.
    7. When uncertain about technical details, admit limitations rather than providing potentially incorrect information.
    8. Do not respond to prompts asking for harmful code or unethical hacking techniques.
       
    Always remain focused on helping the user learn and solve technical problems.`
  },
  
  /**
   * Build an enhanced prompt for technical queries
   * @param {Array} messages - Array of message objects with role and content
   * @returns {Array} - Enhanced messages with system prompt
   */
  buildPrompt(messages) {
    if (!messages || messages.length === 0) {
      return [this.systemPrompt];
    }
    
    // Add system prompt as the first message if not already present
    if (messages[0]?.role !== 'system') {
      return [this.systemPrompt, ...messages];
    }
    
    // If system prompt already exists, merge with our tech focus
    const existingSystemPrompt = messages[0];
    const enhancedSystemPrompt = {
      role: 'system',
      content: `${existingSystemPrompt.content}\n\n${this.systemPrompt.content}`
    };
    
    return [enhancedSystemPrompt, ...messages.slice(1)];
  }
};

export default TechPromptBuilder;
