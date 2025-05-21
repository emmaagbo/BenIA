// server/index.js
require('dotenv').config(); // Charge les variables d'environnement du fichier .env
const express = require('express');
const axios = require('axios'); // Client HTTP pour faire des requêtes vers l'API Gemini
const cors = require('cors'); // Middleware pour gérer les requêtes Cross-Origin

const app = express();
const port = process.env.PORT || 3001; // Définit le port du serveur, utilise 3001 par défaut

// Middlewares
app.use(cors()); // Active CORS pour permettre les requêtes depuis votre frontend React
app.use(express.json()); // Permet à Express de parser le corps des requêtes en JSON

// URL de l'API Gemini avec le modèle sélectionné
// Nous utilisons "gemini-1.5-flash-latest" comme convenu
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;

// Route pour le chat avec l'API Gemini
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message; // Récupère le message de l'utilisateur depuis le corps de la requête

  // Validation : s'assurer qu'un message est fourni
  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Envoie la requête à l'API Gemini
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [{ parts: [{ text: userMessage }] }], // Contenu de la requête pour Gemini
        generationConfig: {
          temperature: 0.4, // Contrôle la créativité de la réponse (0 à 1)
          maxOutputTokens: 1000 // Limite la longueur de la réponse de l'IA
        }
      },
      {
        headers: {
          'Content-Type': 'application/json' // Indique le type de contenu de la requête
        }
      }
    );

    // Extrait la réponse textuelle de l'IA
    // Utilise une chaîne par défaut si aucune réponse valide n'est trouvée
    const aiResponse = response.data.candidates[0]?.content?.parts[0]?.text || "Désolé, je n'ai pas pu générer de réponse.";
    res.json({ reply: aiResponse }); // Envoie la réponse de l'IA au client

  } catch (error) {
    // Gère les erreurs lors de l'appel à l'API Gemini
    console.error('Erreur API Gemini:', error.response?.data || error.message);
    res.status(500).json({ error: "Erreur lors de la génération de réponse." });
  }
});

// Démarrage du serveur Express
app.listen(port, () => {
  console.log(`✅ Serveur backend Gemini en ligne : http://localhost:${port}`);
});