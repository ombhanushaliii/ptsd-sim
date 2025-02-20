import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_GOOGLE_API_KEY}`);

  const getResponseForGivenPrompt = async () => {
    let appendChatHistory = [];
    
    try {
      setLoading(true);
      if (inputValue.trim() === '') {
        setLoading(false);
        return;
      }
  
      appendChatHistory = [
        ...chatHistory,
        { userID: 'user', textContent: inputValue }
      ];
  
      setChatHistory(appendChatHistory);
  
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const meraPrompt = `Teacher teaching something in class, prolly chemistry and she is handling a chemistry beaker, then the beakers breaks and the glass breaks, he gets reminded of trauma, He gets teleported to home, where he runs to see what happened where father abusing mother after which mother tells you to run just after that run run run sound effect in distorted voice, then the teacher follows you to console you But you feel like its a monster(father) running behind you, this is my project for an XR hackathon aimed to simulate PTSD, to spread awareness, you are a chat bot available on the website where the above project is deployed, your sole purpose is to help people gain knowledge, awareness, and gain empathy towards people suffering from PTSD, You are a multilingual chat bot, therefore are supposed to detect which language the user prompts to you initially and reply with the same for the conversation, you are supposed to give certain and politically right answers always, Do Not Specify which language are you replying in the conversation, you are supposed to detect the language and reply in the same language, and do NOT reply in multiple languages, after every prompt write a generic ending signature asking the user whether they have any more doubts, you are not supposed to repeat your true intention to every one, just reply with something like "I am here to help you learn more about Post Traumatic Stress Disorder, how can I help you?", Be Certain about your answers do not answer vaguely and do NOT hallucinate, You are suppossed always be helpful to the user and talk kindly`;
      
      // Get the response
      const result = await model.generateContent(meraPrompt + "\n\nUser: " + inputValue);
      
      if (!result.response) {
        throw new Error('No response from API');
      }
      
      // Get the response text directly - no JSON parsing needed
      const responseText = await result.response.text();
      
      setChatHistory([
        ...appendChatHistory,
        { userID: 'chatBot', textContent: responseText }
      ]);
  
    } catch (error) {
      console.error('API Error:', error);
      setChatHistory([
        ...appendChatHistory,
        { 
          userID: 'chatBot', 
          textContent: 'I apologize, but I encountered an error. Please try again in a moment.' 
        }
      ]);
    } finally {
      setLoading(false);
      setInputValue('');
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
        <div className="fixed top-16 right-0 w-1/2 h-[calc(100vh-4rem)] bg-white shadow-xl flex flex-col rounded-l-2xl transition-all duration-300">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">PTSD mentor</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <CloseIcon />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`max-w-[80%] ${
                  chat.userID === 'chatBot' 
                    ? 'ml-auto bg-blue-100 rounded-l-lg rounded-tr-lg' 
                    : 'bg-gray-100 rounded-r-lg rounded-tl-lg'
                } p-3`}
              >
                <p>{chat.textContent}</p>
              </div>
            ))}
            {loading && (
              <div className="ml-auto max-w-[80%] bg-blue-100 rounded-l-lg rounded-tr-lg p-3">
                <p>Thinking...</p>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Type your message..."
              />
              <button
                onClick={getResponseForGivenPrompt}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
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

const MicIcon = () => (
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
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" x2="12" y1="19" y2="22" />
  </svg>
);

export default Chatbot;