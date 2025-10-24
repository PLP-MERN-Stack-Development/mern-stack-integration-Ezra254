import React from 'react'
import { BookOpen, Heart, Github, Twitter, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-5 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white opacity-5 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white opacity-5 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container relative z-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">MERN Blog</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              A modern, full-stack blog application built with MongoDB, Express.js, React.js, and Node.js. 
              Experience the power of contemporary web development.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-all duration-300 hover:scale-110">
                <Github className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-all duration-300 hover:scale-110">
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-all duration-300 hover:scale-110">
                <Mail className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center gap-2">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="/posts" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center gap-2">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  All Posts
                </a>
              </li>
              <li>
                <a href="/login" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center gap-2">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Login
                </a>
              </li>
              <li>
                <a href="/register" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center gap-2">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Features</h3>
            <ul className="space-y-3">
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                User Authentication
              </li>
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                CRUD Operations
              </li>
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                Responsive Design
              </li>
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                Modern UI/UX
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white border-opacity-20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-300 text-center md:text-left">
              &copy; 2024 MERN Blog. All rights reserved. Built with modern web technologies.
            </p>
            <div className="flex items-center gap-2 text-gray-300">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>using MERN Stack</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

