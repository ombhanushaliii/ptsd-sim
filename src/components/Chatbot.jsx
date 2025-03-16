import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Initialize API client with proper error handling
  let genAI;
  try {
    genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
  } catch (error) {
    console.error('Error initializing Google AI:', error);
  }

  useEffect(() => {
    setChatHistory([{ userID: 'chatBot', textContent: 'Hello! I\'m your PTSD Mentor. 💙\n\n\n I\'m here to help you understand PTSD, manage triggers, and find support. You\'re not alone - Small steps matter. \n How can I help you today? ' }]);
  }, []);

  const getResponseForGivenPrompt = async () => {
    if (inputValue.trim() === '') return;
    
    const userMessage = inputValue;
    const updatedHistory = [
      ...chatHistory,
      { userID: 'user', textContent: userMessage }
    ];
    
    setChatHistory(updatedHistory);
    setInputValue('');
    setLoading(true);
    
    try {
      // Check if API client is initialized
      if (!genAI) {
        genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
        if (!genAI) throw new Error('Failed to initialize Google AI');
      }
      
      // Most current model names (as of 2025)
      const modelOptions = [
        'gemini-1.5-pro',  // Try newer models first
        'gemini-1.0-pro', 
        'gemini-pro'       // Fallback to original name
      ];
      
      let result = null;
      let lastError = null;
      
      // Try different model versions
      for (const modelName of modelOptions) {
        try {
          console.log(`Trying model: ${modelName}`);
          const model = genAI.getGenerativeModel({ model: modelName });
          
          const meraPrompt = `Teacher teaching something in class, prolly chemistry and she is handling a chemistry beaker, then the beakers breaks and the glass breaks, he gets reminded of trauma, He gets teleported to home, where he runs to see what happened where father abusing mother after which mother tells you to run just after that run run run sound effect in distorted voice, then the teacher follows you to console you But you feel like its a monster(father) running behind you, this is my project for an XR hackathon aimed to simulate PTSD, to spread awareness, you are a chat bot available on the website where the above project is deployed, your sole purpose is to help people gain knowledge, awareness, and gain empathy towards people suffering from PTSD, You are a multilingual chat bot, therefore are supposed to detect which language the user prompts to you initially and reply with the same for the conversation, you are supposed to give certain and politically right answers always, Do Not Specify which language are you replying in the conversation, you are supposed to detect the language and reply in the same language, and do NOT reply in multiple languages, after every prompt write a generic ending signature asking the user whether they have any more doubts, you are not supposed to repeat your true intention to every one, just reply with something like "I am here to help you learn more about Post Traumatic Stress Disorder, how can I help you?", Be Certain about your answers do not answer vaguely and do NOT hallucinate, You are suppossed always be helpful to the user and talk kindly`;
          
          // Try different API formats
          try {
            // Most current format (Gemini 1.5+)
            result = await model.generateContent({
              contents: [{ role: 'user', parts: [{ text: `${meraPrompt}\n\nUser: ${userMessage}` }] }],
              generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
              }
            });
            break; // Success, exit the loop
          } catch (formatError) {
            console.log('Structured format failed, trying direct format');
            // Legacy format (Gemini 1.0)
            result = await model.generateContent(`${meraPrompt}\n\nUser: ${userMessage}`);
            break; // Success, exit the loop
          }
        } catch (modelError) {
          console.error(`Error with model ${modelName}:`, modelError);
          lastError = modelError;
          // Continue to next model option
        }
      }
      
      if (!result || !result.response) {
        throw new Error(lastError ? lastError.message : 'No response from any model version');
      }
      
      const responseText = result.response.text();
      
      setChatHistory([
        ...updatedHistory,
        { userID: 'chatBot', textContent: responseText }
      ]);
    } catch (error) {
      console.error('Final API Error:', error);
      
      setChatHistory([
        ...updatedHistory,
        { 
          userID: 'chatBot', 
          textContent: `I apologize, but I encountered an error. Please try again in a moment. (Error details in console)` 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      getResponseForGivenPrompt();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-300"
        >
          <ChatIcon />
        </button>
      ) : (
        <div className="fixed bottom-4 right-2 w-1/2 h-[calc(100vh-10rem)] bg-gray-900 opacity-80 text-white shadow-xl flex flex-col rounded-2xl transition-all duration-300">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold">PTSD Mentor</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-300"
            >
              <CloseIcon />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`max-w-[80%] ${
                  chat.userID === 'user' 
                    ? 'ml-auto bg-blue-700 rounded-l-lg rounded-tr-lg' 
                    : 'bg-gray-800 rounded-r-lg rounded-tl-lg'
                } p-3`}
              >
                <p className="whitespace-pre-line">{chat.textContent}</p>
              </div>
            ))}
            {loading && (
              <div className="bg-gray-800 max-w-[80%] rounded-r-lg rounded-tl-lg p-3">
                <p>Thinking...</p>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 bg-gray-800 text-white"
                placeholder="Type your message..."
                disabled={loading}
              />
              <button
                onClick={getResponseForGivenPrompt}
                className={`bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ChatIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

export default Chatbot;