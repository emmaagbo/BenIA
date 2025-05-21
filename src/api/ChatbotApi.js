// src/api/chatbotApi.js
import axios from 'axios';

// L'URL de votre serveur proxy (doit correspondre au port de votre backend)
const CHATBOT_API_BASE_URL = 'http://localhost:3001/api'; 

export const getChatbotResponse = async (message) => {
  try {
    const response = await axios.post(`${CHATBOT_API_BASE_URL}/chat`, { message });
    return response.data.reply;
  } catch (error) {
    console.error('Erreur lors de l\'appel à l\'API du chatbot:', error);
    throw new Error("Désolé, je n'ai pas pu obtenir de réponse pour le moment.");
  }
};