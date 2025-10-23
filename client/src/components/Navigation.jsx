import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../App'
import { Home, BookOpen, Plus, User, LogOut, LogIn } from 'lucide-react'

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <BookOpen className="w-8 h-8 text-blue-600" />
            MERN Blog
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                isActive('/') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link
              to="/posts"
              className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                isActive('/posts') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Posts
            </Link>
            {isAuthenticated && (
              <Link
                to="/create-post"
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                  isActive('/create-post') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Plus className="w-4 h-4" />
                Create Post
              </Link>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.firstName ? user.firstName[0] : user?.username[0]}
                  </div>
                  <span className="hidden sm:block text-sm text-gray-700">
                    {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.username}
                  </span>
                </div>
                <Link
                  to="/profile"
                  className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                    isActive('/profile') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:block">Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                    isActive('/login') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary btn-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900">
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

