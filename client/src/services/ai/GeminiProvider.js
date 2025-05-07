/**
 * Google Gemini AI provider 
 */

const GeminiProvider = {
  // Use the correct React environment variable format
  apiKey: `${import.meta.env.VITE_APP_GEMINI_API_KEY}`, // API key for authentication
  modelName: 'gemini-2.0-flash', // Default model
  apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/',
  
  initialize(config = {}) {
    // Check for config.apiKey first, then environment variable
    this.apiKey = config.apiKey || import.meta.env.VITE_APP_GEMINI_API_KEY || '';
    this.modelName = config.modelName || this.modelName;
    
    if (!this.apiKey) {
      console.warn("Gemini API key not provided. Please set REACT_APP_GEMINI_API_KEY in your .env file or provide it in the config.");
      console.log("Make sure your .env file is in the root directory of your project and contains: REACT_APP_GEMINI_API_KEY=your_api_key_here");
    } else {
      console.log(`Gemini provider initialized with model: ${this.modelName}`);
    }
    
    // Return success status based on API key availability
    return !!this.apiKey;
  },
  
  /**
   * Convert messages array to Gemini compatible format
   */
  formatMessages(messages) {
    // Map our message format to Gemini's expected format
    return messages.map(msg => {
      // For Gemini, 'system' role is handled as 'user'
      const role = msg.role === 'system' ? 'user' : msg.role;
      
      return {
        role: role,
        parts: [{ text: msg.content }]
      };
    });
  },
  
  async getCompletion(messages) {
    if (!this.apiKey) {
      throw new Error("Gemini API key not configured. Please add REACT_APP_GEMINI_API_KEY to your .env file or initialize the provider with an API key.");
    }
    
    try {
      const formattedMessages = this.formatMessages(messages);
      
      const response = await fetch(`${this.apiUrl}${this.modelName}:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: formattedMessages,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
            topP: 0.95,
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Gemini API error: ${response.status} ${JSON.stringify(errorData)}`);
      }
      
      const result = await response.json();
      
      // Extract the generated text from the response
      return result.candidates[0]?.content?.parts[0]?.text || "Sorry, I couldn't generate a response.";
      
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  }
};

export default GeminiProvider;
