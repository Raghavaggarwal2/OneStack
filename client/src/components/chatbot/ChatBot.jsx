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
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-3.5 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label="Toggle chat"
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
        <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out border border-gray-200 dark:border-gray-700 overflow-hidden transform animate-fadeIn">
          {/* Chat header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium">OneStack Tech Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={clearHistory}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1.5 transition-colors tooltip"
                aria-label="Clear chat history"
                title="Clear chat history"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button 
                onClick={toggleChat}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1.5 transition-colors"
                aria-label="Close chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages container */}
          <div className="flex-1 p-4 overflow-y-auto max-h-96 space-y-4 bg-gray-50 dark:bg-gray-900 scroll-smooth">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                {msg.role === 'assistant' && (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className={`max-w-[75%] break-words rounded-2xl px-4 py-3 ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-none shadow-md' 
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none shadow-md border border-gray-200 dark:border-gray-600'
                }`}>
                  {msg.role === 'assistant' ? (
                    <MessageContent content={msg.content} />
                  ) : (
                    <p className="text-sm">{msg.content}</p>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ml-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fadeIn">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center mr-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-2xl rounded-tl-none p-4 max-w-[75%] shadow-md border border-gray-200 dark:border-gray-600">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-300"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-800">
            <div className="flex rounded-full bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500 dark:bg-gray-700 px-3 py-1 shadow-inner">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Ask a tech question..."
                className="flex-1 bg-transparent px-2 py-2 border-none text-gray-700 dark:text-gray-200 text-sm rounded-3xl"
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`p-2 ml-2 rounded-full ${input.trim() === '' || isLoading 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:hover:bg-gray-600'} transition-colors focus:outline-none`}
                disabled={isLoading || input.trim() === ''}
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className="h-4 w-4" strokeWidth="2">
                  <path d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z" fill="currentColor" />
                </svg>
              </button>
            </div>
            <div className="text-xs text-center text-gray-500 mt-2">
              Ask me any tech-related questions
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
