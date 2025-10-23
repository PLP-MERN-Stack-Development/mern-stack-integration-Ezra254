import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { postService } from '../services/api'
import { Calendar, User, Eye, ArrowRight } from 'lucide-react'
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
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to MERN Blog
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Share your thoughts, stories, and ideas with the world
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/posts" className="btn btn-lg bg-white text-blue-600 hover:bg-gray-100">
              Explore Posts
            </Link>
            <Link to="/create-post" className="btn btn-lg bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600">
              Write Your Story
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Latest Posts</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the latest stories and insights from our community of writers
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts yet</h3>
              <p className="text-gray-600 mb-6">Be the first to share your story!</p>
              <Link to="/create-post" className="btn btn-primary">
                Create First Post
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post._id} className="card hover:shadow-lg transition-shadow">
                  {post.featuredImage && post.featuredImage !== 'default-post.jpg' && (
                    <div className="aspect-video bg-gray-200">
                      <img
                        src={`/uploads/${post.featuredImage}`}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="card-body">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="badge badge-primary"
                        style={{ backgroundColor: post.category?.color + '20', color: post.category?.color }}
                      >
                        {post.category?.name}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                      <Link to={`/posts/${post.slug}`} className="hover:text-blue-600">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt || post.content.substring(0, 150) + '...'}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author?.firstName || post.author?.username}</span>
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
                      className="btn btn-outline w-full flex items-center justify-center gap-2"
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
            <div className="text-center mt-12">
              <Link to="/posts" className="btn btn-primary btn-lg">
                View All Posts
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose MERN Blog?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the power of modern web development with our full-stack MERN application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast & Responsive</h3>
              <p className="text-gray-600">
                Built with modern technologies for optimal performance and user experience
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Authentication</h3>
              <p className="text-gray-600">
                Robust user authentication and authorization system to protect your content
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Rich Features</h3>
              <p className="text-gray-600">
                Comments, categories, search, and more features to enhance your blogging experience
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
