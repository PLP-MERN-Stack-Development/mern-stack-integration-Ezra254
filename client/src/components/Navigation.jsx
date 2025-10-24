import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../App'
import { useTheme } from '../contexts/ThemeContext'
import { Home, BookOpen, Plus, User, LogOut, LogIn, Sun, Moon } from 'lucide-react'

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="glass sticky top-0 z-50 backdrop-blur-md">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 text-2xl font-bold hover-lift">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="gradient-text">MERN Blog</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-white hover:bg-opacity-20 hover:text-gray-800'
              }`}
            >
              <Home className="w-5 h-5" />
              Home
            </Link>
            <Link
              to="/posts"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                isActive('/posts') 
                  ? 'bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-white hover:bg-opacity-20 hover:text-gray-800'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Posts
            </Link>
            {isAuthenticated && (
              <Link
                to="/create-post"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive('/create-post') 
                    ? 'bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-white hover:bg-opacity-20 hover:text-gray-800'
                }`}
              >
                <Plus className="w-5 h-5" />
                Create Post
              </Link>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-gray-600 to-gray-800 text-white hover:shadow-lg transition-all duration-300 hover-lift"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {user?.firstName ? user.firstName[0] : user?.username[0]}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.username}
                  </span>
                </div>
                <Link
                  to="/profile"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive('/profile') 
                      ? 'bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-white hover:bg-opacity-20 hover:text-gray-800'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:block">Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive('/login') 
                      ? 'bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-white hover:bg-opacity-20 hover:text-gray-800'
                  }`}
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary btn-sm hover-lift"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-gray-800 transition-colors p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

