import axios from 'axios';

const DEEPSEEK_API_KEY = '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'; // Remplacez par votre clé API
const DEEPSEEK_API_URL = 'https://openrouter.ai/deepseek/deepseek-chat-v3-0324:free'; // Vérifiez l'URL de l'API

export const getDeepSeekResponse = async (message) => {
  try {
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: "deepseek-chat", // ou le modèle approprié
        messages: [
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    return "Désolé, je n'ai pas pu obtenir de réponse pour le moment.";
  }
};