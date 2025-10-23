import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { authService } from './services/api'
import Layout from './components/Layout'
import Home from './pages/Home'
import PostList from './pages/PostList'
import PostDetail from './pages/PostDetail'
import PostForm from './pages/PostForm'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

// Auth Context
const AuthContext = createContext()

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: null,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
    error: null,
  })

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (token && user) {
      try {
        const userData = JSON.parse(user)
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: userData, token },
        })
      } catch (error) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await authService.login(credentials)
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: response.user, token: response.token },
      })
      return response
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.response?.data?.error || 'Login failed',
      })
      throw error
    }
  }

  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await authService.register(userData)
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: response.user, token: response.token },
      })
      return response
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.response?.data?.error || 'Registration failed',
      })
      throw error
    }
  }

  const logout = () => {
    authService.logout()
    dispatch({ type: 'LOGOUT' })
  }

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Protected route component
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Login />
  }

  return children
}

// Main App component
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="posts" element={<PostList />} />
          <Route path="posts/:id" element={<PostDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="create-post"
            element={
              <ProtectedRoute>
                <PostForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit-post/:id"
            element={
              <ProtectedRoute>
                <PostForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App

