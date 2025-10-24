import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { postService } from '../services/api'
import { Calendar, User, Eye, ArrowRight, BookOpen, Plus, Zap, Shield, Heart } from 'lucide-react'
import { format } from 'date-fns'

const Home = () => {
  const { data: postsData, isLoading, error } = useQuery(
    'recent-posts',
    () => postService.getAllPosts(1, 6),
    {
      select: (data) => data.data.posts,
    }
  )

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="loading"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Posts</h2>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    )
  }

  const posts = postsData || []

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20"></div>
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-white opacity-10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white opacity-10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container relative z-10 text-center">
          <div className="animate-fadeInUp">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                MERN Blog
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Share your thoughts, stories, and ideas with the world. 
              Experience the power of modern web development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideInLeft">
              <Link 
                to="/posts" 
                className="btn btn-lg glass hover-lift hover-glow text-white border-white hover:bg-white hover:text-purple-600"
              >
                <BookOpen className="w-5 h-5" />
                Explore Posts
              </Link>
              <Link 
                to="/create-post" 
                className="btn btn-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white hover-lift"
              >
                <Plus className="w-5 h-5" />
                Write Your Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 relative">
        <div className="container">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Latest Stories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Discover the latest stories and insights from our community of writers
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16 animate-fadeIn">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 gradient-text">No posts yet</h3>
              <p className="text-gray-600 mb-8 text-lg">Be the first to share your story!</p>
              <Link to="/create-post" className="btn btn-primary btn-lg hover-lift">
                <Plus className="w-5 h-5" />
                Create First Post
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <article 
                  key={post._id} 
                  className="card hover-lift animate-fadeInUp"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {post.featuredImage && post.featuredImage !== 'default-post.jpg' && (
                    <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                      <img
                        src={`/uploads/${post.featuredImage}`}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="card-body">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="badge badge-primary px-3 py-1 rounded-full text-sm font-medium"
                        style={{ 
                          background: `${post.category?.color}20`, 
                          color: post.category?.color,
                          border: `1px solid ${post.category?.color}40`
                        }}
                      >
                        {post.category?.name}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2 hover:text-purple-600 transition-colors">
                      <Link to={`/posts/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt || post.content.substring(0, 150) + '...'}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span className="font-medium">{post.author?.firstName || post.author?.username}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{post.viewCount}</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <Link
                      to={`/posts/${post.slug}`}
                      className="btn btn-outline w-full flex items-center justify-center gap-2 hover-lift"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {posts.length > 0 && (
            <div className="text-center mt-16 animate-fadeInUp">
              <Link to="/posts" className="btn btn-primary btn-lg hover-lift">
                <BookOpen className="w-5 h-5" />
                View All Posts
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Why Choose MERN Blog?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Experience the power of modern web development with our full-stack MERN application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-fadeInUp hover-lift">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 gradient-text">Fast & Responsive</h3>
              <p className="text-gray-600 leading-relaxed">
                Built with modern technologies for optimal performance and seamless user experience across all devices
              </p>
            </div>

            <div className="text-center animate-fadeInUp hover-lift" style={{animationDelay: '0.2s'}}>
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse" style={{animationDelay: '0.5s'}}>
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 gradient-text">Secure Authentication</h3>
              <p className="text-gray-600 leading-relaxed">
                Robust user authentication and authorization system to protect your content and personal information
              </p>
            </div>

            <div className="text-center animate-fadeInUp hover-lift" style={{animationDelay: '0.4s'}}>
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse" style={{animationDelay: '1s'}}>
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 gradient-text">Rich Features</h3>
              <p className="text-gray-600 leading-relaxed">
                Comments, categories, search, and more features to enhance your blogging experience and engagement
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

