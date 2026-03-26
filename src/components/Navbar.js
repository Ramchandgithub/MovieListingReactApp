import { Link, useLocation } from "react-router-dom";
import { Film } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-md border-b border-gray-800/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
              <Film className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              MovieFlex
            </span>
          </div>

          <div className="flex gap-1 md:gap-4">
            {['Home', 'Hollywood', 'Bollywood', 'Tollywood'].map((item) => {
              const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
              return (
                <Link
                  key={item}
                  to={path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 
                    ${isActive(path) 
                      ? 'bg-blue-500/10 text-blue-400' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }`}
                >
                  {item}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}