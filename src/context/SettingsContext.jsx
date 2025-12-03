import { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  // 1. FONT SIZE LOGIC
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem("bible-font-size");
    return saved ? parseInt(saved) : 20;
  });

  useEffect(() => {
    localStorage.setItem("bible-font-size", fontSize);
  }, [fontSize]);

  const increaseSize = () => setFontSize((prev) => Math.min(prev + 2, 40));
  const decreaseSize = () => setFontSize((prev) => Math.max(prev - 2, 14));

  // 2. FAVORITES LOGIC (This is what you are missing!)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("bible-favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("bible-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (book, chapter) => {
    setFavorites((prev) => {
      // We force everything to strings to avoid "1" vs 1 mismatch errors
      const exists = prev.find((f) => f.book === book && String(f.chapter) === String(chapter));
      if (exists) {
        return prev.filter((f) => !(f.book === book && String(f.chapter) === String(chapter)));
      } else {
        return [...prev, { book, chapter, date: new Date().toISOString() }];
      }
    });
  };

  const isFavorite = (book, chapter) => {
    return favorites.some((f) => f.book === book && String(f.chapter) === String(chapter));
  };

  // 3. EXPORT EVERYTHING (Crucial!)
  return (
    <SettingsContext.Provider 
      value={{ 
        fontSize, increaseSize, decreaseSize, 
        favorites, toggleFavorite, isFavorite 
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};