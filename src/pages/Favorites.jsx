import { Link } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";
import { Trash2, BookOpen, ArrowLeft } from "lucide-react";

const Favorites = () => {
  const { favorites, toggleFavorite } = useSettings();

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-gray-400 hover:text-white transition-colors">
           <div className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" /> Back
           </div>
        </Link>
        <h1 className="text-3xl font-bold text-white">My Favorites</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-gray-800/30 rounded-xl border border-dashed border-gray-700">
          <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl text-gray-300 font-semibold">No favorites yet</h3>
          <p className="text-gray-500">Click the heart icon on any chapter to save it here.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {favorites.map((fav) => (
            <div 
              key={`${fav.book}-${fav.chapter}`}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500 transition-all group"
            >
              <Link 
                to={`/read/${fav.book}/${fav.chapter}`}
                className="flex-1 flex items-center gap-4"
              >
                <div className="bg-blue-900/30 p-3 rounded-full text-blue-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-100">{fav.book}</h3>
                  <p className="text-blue-400">Chapter {fav.chapter}</p>
                </div>
              </Link>

              <button
                onClick={() => toggleFavorite(fav.book, fav.chapter)}
                className="p-3 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-colors"
                title="Remove from favorites"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;