import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getChapter, BIBLE_DATA } from "../lib/api";
import { useSettings } from "../context/SettingsContext";
import { ArrowLeft, Minus, Plus, Loader2, ChevronRight, ChevronLeft, Heart } from "lucide-react";

const Reader = () => {
  const { book, chapter } = useParams();
  const navigate = useNavigate();
  
  // Get favorites logic from context
  const { fontSize, increaseSize, decreaseSize, toggleFavorite, isFavorite } = useSettings();

  const chapterNum = parseInt(chapter);
  const isSaved = isFavorite(book, chapter); // Check if this chapter is already saved

  const { data, isLoading, isError } = useQuery({
    queryKey: ["chapter", book, chapter],
    queryFn: () => getChapter(book, chapter),
  });

  const prevChapter = chapterNum > 1 ? chapterNum - 1 : null;
  const nextChapter = chapterNum < BIBLE_DATA[book] ? chapterNum + 1 : null;

  if (isLoading) return (
    <div className="h-[50vh] flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
    </div>
  );

  if (isError) return <div className="text-center p-10 text-red-400">Error loading chapter.</div>;

  return (
    <div className="max-w-4xl mx-auto pb-32 animate-fade-in">
      
      {/* --- THE CONTROL BAR --- */}
      <div className="sticky top-16 z-40 bg-gray-900/95 border-b border-gray-800 py-4 px-2 mb-8 flex items-center justify-between backdrop-blur">
        
        <Link 
          to={`/book/${book}`} 
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <div className="p-2 rounded-full group-hover:bg-gray-800">
            <ArrowLeft className="w-6 h-6" />
          </div>
        </Link>

        {/* TITLE & HEART */}
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-gray-200">
            {book} <span className="text-blue-500">{chapter}</span>
          </h2>
          <button 
            onClick={() => toggleFavorite(book, chapter)}
            className="transition-transform active:scale-90"
          >
            <Heart 
              className={`w-6 h-6 ${isSaved ? "fill-red-500 text-red-500" : "text-gray-500 hover:text-red-400"}`} 
            />
          </button>
        </div>

        {/* ZOOM CONTROLS */}
        <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1 border border-gray-700">
          <button onClick={decreaseSize} className="p-2 hover:bg-gray-700 rounded-md text-gray-300">
            <Minus className="w-5 h-5" />
          </button>
          <button onClick={increaseSize} className="p-2 hover:bg-gray-700 rounded-md text-white">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* --- THE BIBLE TEXT --- */}
      <div className="px-4 md:px-8">
        <div 
          className="bible-text text-gray-200 transition-all duration-200"
          style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
        >
          {data.verses.map((verse) => (
            <span key={verse.verse} className="hover:bg-gray-800/50 rounded transition-colors">
              <sup className="text-gray-500 text-xs mr-1 font-sans select-none">{verse.verse}</sup>
              {verse.text}{" "}
            </span>
          ))}
        </div>
      </div>

      {/* --- BOTTOM NAVIGATION --- */}
      <div className="mt-16 flex justify-between gap-4 px-4">
        {prevChapter ? (
          <button
            onClick={() => navigate(`/read/${book}/${prevChapter}`)}
            className="flex-1 py-4 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all border border-gray-700"
          >
            <ChevronLeft className="w-5 h-5" /> Previous
          </button>
        ) : <div className="flex-1"></div>}

        {nextChapter ? (
          <button
            onClick={() => navigate(`/read/${book}/${nextChapter}`)}
            className="flex-1 py-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-lg shadow-blue-900/20"
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        ) : <div className="flex-1"></div>}
      </div>
    </div>
  );
};

export default Reader;