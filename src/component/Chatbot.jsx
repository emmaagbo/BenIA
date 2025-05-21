import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';
import { getChatbotResponse } from '../api/ChatbotApi'; // Importez la fonction d'API

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Appel à votre fonction d'API qui interagit avec le serveur proxy
      const aiResponse = await getChatbotResponse(userMessage.text);

      const botMessage = { text: aiResponse, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Erreur lors de l'obtention de la réponse de l'IA :", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Désolé, une erreur est survenue.", sender: 'bot' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold text-center text-green-400 mb-6">BenIA</h1>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-800 rounded-lg shadow-xl mb-4 custom-scrollbar">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
        {loading && (
          <div className="flex justify-start mb-4">
            <div className="max-w-xs p-3 rounded-lg bg-gray-700 text-white rounded-bl-none animate-pulse">
              <p>Le chatbot est en train d'écrire...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-3 rounded-l-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Tapez votre message ici..."
          disabled={loading}
        />
        <button
          onClick={handleSendMessage}
          className="bg-green-500 hover:bg-green-600 text-gray-900 font-bold py-3 px-6 rounded-r-lg transition duration-300 disabled:opacity-50"
          disabled={loading}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}

export default Chatbot;