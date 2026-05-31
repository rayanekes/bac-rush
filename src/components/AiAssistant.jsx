import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const AiAssistant = ({ tasks, setTasks, flashcards, setFlashcards }) => {
  const envApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Bonjour ! Je suis ton Professeur IA spécialité STE. Comment puis-je t\'aider à réviser ?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const getGeminiModel = () => {
    if (!envApiKey) return null;
    const genAI = new GoogleGenerativeAI(envApiKey);
    return genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  };

  const handleChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !envApiKey) return;

    const userText = chatInput.trim();
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setChatInput('');
    setIsLoading(true);

    try {
      const model = getGeminiModel();
      // Pour une réponse concise
      const prompt = `Tu es un professeur expert de la filière STE (Sciences et Technologies Électriques) au Maroc. 
      Réponds à l'élève de manière concise, directe et encourageante.
      Élève : ${userText}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: '⚠️ Erreur de connexion avec l\'API. Vérifie ta clé.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateFlashcards = async () => {
    if (!envApiKey) return;
    setIsLoading(true);
    try {
      const model = getGeminiModel();
      const prompt = `Génère 3 flashcards pertinentes pour le Bac STE Marocain. 
      Choisis aléatoirement parmi ces matières : Sciences de l'Ingénieur, Mathématiques, Physique-Chimie, Philosophie, Anglais.
      IMPORTANT : La réponse DOIT être UNIQUEMENT un tableau JSON valide. Ne met pas de backticks markdown autour du JSON.
      Le format d'un objet doit être : {"id": un_nombre_unique_aleatoire, "subject": "Nom_Matiere", "question": "La_question", "answer": "La_reponse"}`;

      const result = await model.generateContent(prompt);
      let text = await result.response.text();
      
      // Clean potential markdown blocks
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const newFlashcards = JSON.parse(text);
      setFlashcards(prev => [...newFlashcards, ...prev]);
      
      setMessages(prev => [...prev, { role: 'model', text: '✅ J\'ai généré et ajouté 3 nouvelles flashcards dans ton module !' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: '⚠️ Erreur lors de la génération des flashcards. Le format retourné n\'était peut-être pas valide.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateTasks = async () => {
    if (!envApiKey) return;
    setIsLoading(true);
    try {
      const model = getGeminiModel();
      const currentTaskTexts = tasks.map(t => t.text).join(", ");
      const prompt = `Voici mes tâches actuelles pour le Bac STE : ${currentTaskTexts}.
      Génère 3 nouvelles tâches prioritaires, concrètes et spécifiques pour la filière STE (ex: refaire un montage, réviser un chapitre de maths).
      IMPORTANT : La réponse DOIT être UNIQUEMENT un tableau JSON valide. Ne met pas de backticks markdown autour du JSON.
      Le format d'un objet doit être : {"id": un_nombre_unique_aleatoire, "text": "La tâche précise", "completed": false, "priority": "high"}`;

      const result = await model.generateContent(prompt);
      let text = await result.response.text();
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const newTasks = JSON.parse(text);
      setTasks(prev => [...newTasks, ...prev]);
      
      setMessages(prev => [...prev, { role: 'model', text: '✅ J\'ai ajouté 3 nouvelles missions prioritaires à ton planning !' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: '⚠️ Erreur lors de la génération des tâches.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel ai-widget">
      <h2>Professeur IA (Gemini)</h2>
      
      {!envApiKey ? (
        <div className="api-warning">
          <p>⚠️ Clé API Gemini manquante. Ajoute VITE_GEMINI_API_KEY dans le fichier .env</p>
        </div>
      ) : (
        <>
          <div className="chat-box">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.role}`}>
                <div className="message-bubble">{msg.text}</div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message model">
                <div className="message-bubble typing">...</div>
              </div>
            )}
          </div>
          
          <form onSubmit={handleChat} className="chat-form">
            <input 
              type="text" 
              className="glass-input" 
              placeholder="Pose-moi une question sur le cours..." 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" className="btn-primary" disabled={isLoading}>➔</button>
          </form>

          <div className="ai-actions">
            <button type="button" className="btn-outline ai-action-btn" onClick={generateFlashcards} disabled={isLoading}>
              ✨ Générer des Flashcards
            </button>
            <button type="button" className="btn-outline ai-action-btn" onClick={generateTasks} disabled={isLoading}>
              📅 Optimiser le Planning
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AiAssistant;
