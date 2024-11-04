// initializeWords.js
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "./firebaseConfig"; // Assurez-vous que le chemin est correct

const words = [
  "Coran", "Mosquée", "Ramadan", "Prière", "Hajj", "Prophète", "Mecque", "Médine", "Ayat", "Shahada",
  "Zakat", "Halal", "Hadith", "Iftar", "Aïd", "Salat", "Imam", "Calife", "Fatwa", "Kaaba",
  "Jumu'ah", "Sounna", "Dua", "Barakah", "Fajr", "Hijab", "Sadaqah", "Fiqh", "Sharia", "Tawheed",
  "Oummah", "Imane", "Jannah", "Jahannam", "Wudu", "Sawm", "Qibla", "Tasbih", "Dhikr",
  "Madrasa", "Rakat", "Sujud", "Minaret", "Adhan", "Muadhin", "Taqwa", "Akhirah", "Jinn", "Juz",
  "Khutbah", "Ulema", "Quran", "Chat", "Chien", "Voiture", "Arbre", "Maison", "Livre", "École", 
  "Ordinateur", "Soleil", "Lune", "Étoile", "Mer", "Montagne", "Rivière", "Pont", "Route", "Fleur", 
  "Jardin", "Avion", "Bateau", "Train", "Vélo", "Moto", "Bus", "Musée", "Cinéma", "Restaurant", 
  "Hôtel", "Plage", "Désert", "Forêt", "Neige", "Pluie", "Orage", "Vent", "Sable", "Roche", "Volcan", "Lac"
];

const addWordsToFirestore = async () => {
  const wordsCollection = collection(db, "words");
  try {
    for (const word of words) {
      await addDoc(wordsCollection, { word });
    }
    console.log("Mots ajoutés avec succès");
  } catch (e) {
    console.error("Erreur lors de l'ajout des mots : ", e);
  }
};

addWordsToFirestore();
