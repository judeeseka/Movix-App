import { Link } from "react-router-dom";
import { Film, Heart, Github, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Film className="h-8 w-8 text-amber-500" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">
                Movix
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Your personal movie discovery and recommendation platform. Find,
              rate, and organize your favorite films.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Discover</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/discover"
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                >
                  Browse Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/tv"
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                >
                  Browse Series
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Your Account</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/profile"
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                >
                  Favorites
                </Link>
              </li>
              <li>
                <Link
                  to="/watchlists"
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                >
                  Watchlists
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Follow us for the latest movie updates and features.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Movix. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span className="text-gray-400 text-sm">for movie lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
