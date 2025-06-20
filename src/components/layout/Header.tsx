import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Film, Search, User, LogOut, Menu, Sun, Moon } from "lucide-react";
import { useThemeStore } from "../../stores/theme-store";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { profileContent } from "@/lib/contants";

export default function Header() {
  const { theme, toggleTheme } = useThemeStore();
  const user = true;
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    // await signOut();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <Film className="h-8 w-8 text-amber-500" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">
              Movix
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex ml-3 items-center gap-4">
            <Link
              to="/movies"
              className={`text-sm font-medium leading transition-colors hover:text-amber-500 ${
                isActive("/movies")
                  ? "text-amber-500"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              Movies
            </Link>
            <Link
              to="/tv-series"
              className={`text-sm font-medium transition-colors hover:text-amber-500 ${
                isActive("/tv-series")
                  ? "text-amber-500"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              TV Series
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-full focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm dark:placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>

            {user ? (
              <>
                {/* Profile Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-red-500 rounded-full flex items-center justify-center cursor-pointer">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="dark:bg-gray-800 min-w-[10rem]">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {profileContent.map((item) => (
                      <DropdownMenuItem key={item.label}>
                        <Link
                          to={`/${item.label.toLowerCase()}`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 w-full dark:hover:bg-gray-700"
                        >
                          <item.icon className="h-4 w-4 mr-3" />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign Out
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-amber-500 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-amber-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="border-t border-gray-200 dark:border-gray-700 py-4 px-4 pt-14">
                <div className="space-y-4">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search movies..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-full focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm dark:placeholder:text-gray-300"
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="space-y-2">
                    <SheetClose asChild>
                      <Link
                        to="/movies"
                        className="block py-2 text-gray-700 dark:text-gray-300 hover:text-amber-500 transition-colors"
                      >
                        Movies
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        to="/series"
                        className="block py-2 text-gray-700 dark:text-gray-300 hover:text-amber-500 transition-colors"
                      >
                        TV Series
                      </Link>
                    </SheetClose>

                    {/* Mobile Auth */}
                    {!user && (
                      <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <SheetClose asChild>
                          <Link
                            to="/login"
                            className="block w-full text-center py-2 text-gray-700 dark:text-gray-300 hover:text-amber-500 transition-colors"
                          >
                            Sign In
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            to="/register"
                            className="block w-full text-center bg-gradient-to-r from-amber-500 to-red-500 text-white py-2 rounded-full font-medium hover:shadow-lg transition-all duration-200"
                          >
                            Sign Up
                          </Link>
                        </SheetClose>
                      </div>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
