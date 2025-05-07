import React, { createContext, useContext, useState } from 'react';

// Import all available providers
import DummyAIProvider from '../services/ai/DummyAIProvider';
import HuggingFaceProvider from '../services/ai/HuggingFaceProvider';
import GeminiProvider from '../services/ai/GeminiProvider';
import TechPromptBuilder from '../services/TechPromptBuilder';

// Create context
const AIProviderContext = createContext();

export const useAIProvider = () => useContext(AIProviderContext);

// List of available providers - add new providers here
const availableProviders = {
  dummy: DummyAIProvider,
  huggingface: HuggingFaceProvider,
  gemini: GeminiProvider,
};

export const AIProviderProvider = ({ children }) => {
  // Get provider from configuration (could be stored in env vars or settings)
  // For now, default to dummy provider that doesn't require API keys for initial setup
  const [currentProvider, setCurrentProvider] = useState('gemini');
  
  // Get the provider instance
  const providerInstance = availableProviders[currentProvider];
  
  // Define helper function to get responses with proper tech-focused prompting
  const getResponse = async (messages) => {
    try {
      // Use TechPromptBuilder to enhance the prompt with tech focus
      const enhancedMessages = TechPromptBuilder.buildPrompt(messages);
      
      // Get response from the current provider
      return await providerInstance.getCompletion(enhancedMessages);
    } catch (error) {
      console.error('Error in AI provider:', error);
      throw error;
    }
  };
  
  // Change provider method
  const changeProvider = (providerName, config = {}) => {
    if (!availableProviders[providerName]) {
      throw new Error(`Provider ${providerName} not found`);
    }
    
    // Initialize the provider with any configuration
    availableProviders[providerName].initialize(config);
    setCurrentProvider(providerName);
  };

  
  const value = {
    currentProvider,
    changeProvider,
    getResponse,
  };
  
  return (
    <AIProviderContext.Provider value={value}>
      {children}
    </AIProviderContext.Provider>
  );
};
