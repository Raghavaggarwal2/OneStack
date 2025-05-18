import React, { useState, useRef, useEffect } from 'react';
import { useAIProvider } from '../../context/AIProviderContext';
import TechPromptFilter from '../../services/TechPromptFilter';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markdown';
import ReactMarkdown from 'react-markdown';

// New utility function to format messages
const formatMessage = (content) => {
  if (!content) return [];

  // Regex pattern to detect code blocks with or without language specification
  const codeBlockRegex = /```([a-zA-Z]*\n)?([\s\S]*?)```/g;
  const segments = [];
  let lastIndex = 0;
  let match;

  // Find all code blocks and split content
  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        content: content.substring(lastIndex, match.index)
      });
    }

    // Add code block
    const language = match[1] ? match[1].trim() : '';
    segments.push({
      type: 'code',
      language: language,
      content: match[2].trim()
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text after last code block
  if (lastIndex < content.length) {
    segments.push({
      type: 'text',
      content: content.substring(lastIndex)
    });
  }

  return segments.length > 0 ? segments : [{ type: 'text', content }];
};

// New component for rendering individual code blocks
const CodeBlock = ({ content, language }) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);
  
  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [content, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Map common language names to Prism-supported language classes
  const getLanguageClass = (lang) => {
    const langMap = {
      'js': 'javascript',
      'ts': 'typescript',
      'py': 'python',
      'html': 'markup',
      'sh': 'bash',
      'shell': 'bash',
      'cmd': 'bash',
      '': 'text'
    };
    
    return langMap[lang.toLowerCase()] || lang.toLowerCase();
  };

  return (
    <div className="bg-gray-800 rounded-md my-2 overflow-hidden shadow-lg">
      <div className="flex justify-between items-center py-1.5 px-4 bg-gray-900 text-xs text-gray-400">
        <span>{language || 'code'}</span>
        <button 
          onClick={handleCopy} 
          className="px-2 py-1 text-xs rounded transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {copied ? (
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Copied
            </span>
          ) : (
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              Copy
            </span>
          )}
        </button>
      </div>
      <pre className="p-4 text-sm text-gray-100 overflow-auto">
        <code 
          ref={codeRef} 
          className={`language-${getLanguageClass(language)}`}
        >
          {content}
        </code>
      </pre>
    </div>
  );
};

// Custom components for Markdown rendering
const MarkdownComponents = {
  h1: (props) => <h1 className="text-xl font-bold mt-3 mb-2" {...props} />,
  h2: (props) => <h2 className="text-lg font-bold mt-3 mb-2" {...props} />,
  h3: (props) => <h3 className="text-md font-bold mt-2 mb-1" {...props} />,
  h4: (props) => <h4 className="text-base font-bold mt-2 mb-1" {...props} />,
  h5: (props) => <h5 className="text-sm font-bold mt-1 mb-1" {...props} />,
  h6: (props) => <h6 className="text-xs font-bold mt-1 mb-1" {...props} />,
  p: (props) => <p className="mb-2" {...props} />,
  ul: (props) => <ul className="list-disc pl-5 mb-2 space-y-1" {...props} />,
  ol: (props) => <ol className="list-decimal pl-5 mb-2 space-y-1" {...props} />,
  li: (props) => <li className="my-1" {...props} />,
  a: (props) => <a className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
  blockquote: (props) => <blockquote className="border-l-4 border-gray-400 pl-3 italic my-2" {...props} />,
  strong: (props) => <strong className="font-bold" {...props} />,
  em: (props) => <em className="italic" {...props} />,
  hr: () => <hr className="my-3 border-gray-300" />,
  table: (props) => <div className="overflow-x-auto my-2"><table className="min-w-full border border-collapse border-gray-300" {...props} /></div>,
  thead: (props) => <thead className="bg-gray-100" {...props} />,
  tbody: (props) => <tbody {...props} />,
  tr: (props) => <tr className="border-b border-gray-300" {...props} />,
  th: (props) => <th className="px-4 py-2 text-left font-semibold" {...props} />,
  td: (props) => <td className="px-4 py-2" {...props} />
};

// New component for message rendering
const MessageContent = ({ content }) => {
  const formattedSegments = formatMessage(content);
  
  return (
    <>
      {formattedSegments.map((segment, idx) => (
        <React.Fragment key={idx}>
          {segment.type === 'text' ? (
            <div className="text-sm">
              <ReactMarkdown components={MarkdownComponents}>
                {segment.content}
              </ReactMarkdown>
            </div>
          ) : (
            <CodeBlock content={segment.content} language={segment.language} />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your OneStack Tech Assistant. I can help with programming, tech domains, and computer science questions. What would you like to know?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { getResponse } = useAIProvider();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const clearHistory = () => {
    setMessages([
      { role: 'assistant', content: 'Chat history cleared. How can I help you with your tech questions?' }
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '' || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const isTechQuery = TechPromptFilter.isTechRelated(input);
      
      if (!isTechQuery) {
        setTimeout(() => {
          setMessages(prev => [
            ...prev, 
            { 
              role: 'assistant', 
              content: "I'm designed to help with technical questions related to software development, computer science, and technology domains. Could you please ask me something tech-related?"
            }
          ]);
          setIsLoading(false);
        }, 600);
        return;
      }

      const response = await getResponse(messages.concat(userMessage));
      
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: response }
      ]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: "I'm having trouble processing that request. Please try again later."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[80vh] bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 text-white flex justify-between items-center">
            <h3 className="font-medium">OneStack Tech Assistant</h3>
            <button
              onClick={clearHistory}
              className="text-purple-100 hover:text-white transition-colors"
              title="Clear chat history"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                    : 'bg-white dark:bg-gray-300 shadow-md'
                }`}>
                  <MessageContent content={message.content} />
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-800 border-t border-purple-200 dark:border-purple-700">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-purple-200 dark:border-purple-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .tooltip:hover::after {
          content: attr(title);
          position: absolute;
          bottom: 100%;
          right: 0;
          background: #374151;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          white-space: nowrap;
          margin-bottom: 0.25rem;
        }
      `}</style>
    </div>
  );
};

export default ChatBot;
