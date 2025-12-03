import { Link } from "react-router-dom";
import { BIBLE_BOOKS } from "../lib/api";

const Home = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-white mb-2">Bible Reader</h1>
        <p className="text-gray-400">Select a book to begin reading</p>
      </div>

      {/* The Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20">
        {BIBLE_BOOKS.map((book) => (
          <Link
            key={book}
            to={`/book/${book}`}
            className="group relative p-4 bg-gray-800/50 hover:bg-blue-600 border border-gray-700 rounded-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-100 group-hover:text-white">
                {book}
              </span>
              {/* Little arrow icon using CSS */}
              <span className="text-gray-500 group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;