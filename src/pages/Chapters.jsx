import { Link, useParams } from "react-router-dom";
import { BIBLE_DATA } from "../lib/api";

const Chapters = () => {
  const { book } = useParams();
  
  // 1. Safety check: Does this book exist in our data?
  const totalChapters = BIBLE_DATA[book];

  if (!totalChapters) return <div className="p-10 text-center text-red-500">Book not found</div>;

  // 2. Create an array of numbers: [1, 2, 3, ... 50]
  const chapters = Array.from({ length: totalChapters }, (_, i) => i + 1);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-gray-400 hover:text-white transition-colors">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold text-white">{book}</h1>
      </div>

      <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3">
        {chapters.map((num) => (
          <Link
            key={num}
            to={`/read/${book}/${num}`}
            className="aspect-square flex items-center justify-center bg-gray-800 hover:bg-blue-600 
                       text-gray-300 hover:text-white font-semibold rounded-lg border border-gray-700 
                       hover:border-blue-500 transition-all hover:scale-105 shadow-sm"
          >
            {num}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Chapters;