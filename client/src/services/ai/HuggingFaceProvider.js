/**
 * Hugging Face AI provider that integrates with their Inference API
 */

const HuggingFaceProvider = {
  apiKey: null,
  modelId: 'mistralai/Mistral-7B-Instruct-v0.1', // Default model, can be changed during initialization
  apiUrl: 'https://api-inference.huggingface.co/models/',
  
  initialize(config = {}) {
    this.apiKey = config.apiKey || process.env.REACT_APP_HUGGINGFACE_API_KEY;
    this.modelId = config.modelId || this.modelId;
    
    if (!this.apiKey) {
      console.warn("Hugging Face API key not provided. Please set REACT_APP_HUGGINGFACE_API_KEY environment variable or provide it in the config.");
    }
    
    console.log(`Hugging Face provider initialized with model: ${this.modelId}`);
  },
  
  /**
   * Convert messages array to Hugging Face compatible format
   */
  formatMessages(messages) {
    // Extract system message if present
    const systemMessage = messages.find(msg => msg.role === 'system')?.content || '';
    
    // Format conversation for the model
    let prompt = systemMessage ? `<s>[INST] ${systemMessage} [/INST]</s>\n` : '';
    
    // Add other messages in the conversation
    const nonSystemMessages = messages.filter(msg => msg.role !== 'system');
    
    for (let i = 0; i < nonSystemMessages.length; i++) {
      const message = nonSystemMessages[i];
      if (message.role === 'user') {
        prompt += `<s>[INST] ${message.content} [/INST]`;
      } else if (message.role === 'assistant') {
        prompt += ` ${message.content}</s>\n`;
      }
    }
    
    // If the last message is from the user, close it properly
    if (nonSystemMessages.length > 0 && nonSystemMessages[nonSystemMessages.length - 1].role === 'user') {
      prompt += ` `;
    }
    
    return prompt;
  },
  
  async getCompletion(messages) {
    if (!this.apiKey) {
      throw new Error("Hugging Face API key not configured");
    }
    
    try {
      const formattedPrompt = this.formatMessages(messages);
      
      const response = await fetch(`${this.apiUrl}${this.modelId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          inputs: formattedPrompt,
          parameters: {
            max_new_tokens: 512,
            temperature: 0.7,
            top_p: 0.95,
            do_sample: true,
            return_full_text: false
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Hugging Face API error: ${response.status} ${JSON.stringify(errorData)}`);
      }
      
      const result = await response.json();
      
      // Extract the generated text from the response
      return result[0]?.generated_text || "Sorry, I couldn't generate a response.";
      
    } catch (error) {
      console.error('Error calling Hugging Face API:', error);
      throw error;
    }
  }
};

export default HuggingFaceProvider;
