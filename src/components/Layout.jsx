import { Outlet, Link } from "react-router-dom";
import { Settings, Heart } from "lucide-react"; 

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            BibleApp
          </Link>
          
          <div className="flex items-center gap-2">
            {/* NEW: Favorites Button */}
            <Link 
              to="/favorites"
              className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-red-400"
              title="My Favorites"
            >
              <Heart className="w-6 h-6" />
            </Link>

            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;