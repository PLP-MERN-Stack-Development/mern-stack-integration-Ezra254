// contexts/ThemeContext.jsx - Theme management context

import React, { createContext, useContext, useReducer, useEffect } from 'react'

// Theme Context
const ThemeContext = createContext()

// Theme reducer
const themeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      }
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state
  }
}

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, {
    theme: 'light',
    loading: true,
  })

  // Load theme from localStorage on app load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    
    dispatch({ type: 'SET_THEME', payload: initialTheme })
    dispatch({ type: 'SET_LOADING', payload: false })
  }, [])

  // Update document class and localStorage when theme changes
  useEffect(() => {
    if (!state.loading) {
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(state.theme)
      localStorage.setItem('theme', state.theme)
    }
  }, [state.theme, state.loading])

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' })
  }

  const setTheme = (theme) => {
    dispatch({ type: 'SET_THEME', payload: theme })
  }

  const value = {
    ...state,
    toggleTheme,
    setTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeContext
