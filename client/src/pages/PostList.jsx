import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { postService, categoryService } from '../services/api'
import { Calendar, User, Eye, Search, Filter, ChevronLeft, ChevronRight, Plus, BookOpen } from 'lucide-react'
import { format } from 'date-fns'

const PostList = () => {
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')

  const { data: postsData, isLoading, error } = useQuery(
    ['posts', page, category, search],
    () => postService.getAllPosts(page, 9, category || null),
    {
      select: (data) => data.data,
    }
  )

  const { data: categoriesData } = useQuery(
    'categories',
    () => categoryService.getAllCategories(),
    {
      select: (data) => data.data,
    }
  )

  const handleSearch = (e) => {
    e.preventDefault()
    // For now, we'll just update the search state
    // In a real app, you'd implement search functionality
  }

  if (isLoading) {
    return (
      <div className="min-h-screen py-20">
        <div className="container">
          <div className="text-center mb-16 animate-fadeInUp">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              All Posts
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Discover amazing stories from our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton-card animate-fadeInUp" style={{animationDelay: `${i * 0.1}s`}}>
                <div className="skeleton skeleton-title mb-4"></div>
                <div className="skeleton skeleton-text mb-2"></div>
                <div className="skeleton skeleton-text mb-2"></div>
                <div className="skeleton skeleton-text mb-4 w-3/4"></div>
                <div className="flex justify-between">
                  <div className="skeleton skeleton-text w-20"></div>
                  <div className="skeleton skeleton-text w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen py-20">
        <div className="container">
          <div className="text-center animate-fadeInUp">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4 gradient-text">Error Loading Posts</h2>
            <p className="text-gray-600 mb-8 text-lg">Please try again later.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-primary btn-lg hover-lift"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  const { posts, pagination } = postsData || { posts: [], pagination: {} }
  const categories = categoriesData || []

  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <div className="text-center mb-16 animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            All Posts
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover amazing stories and insights from our community of writers
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-12 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
          <div className="flex flex-col lg:flex-row gap-6">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="search-input">
                <input
                  type="text"
                  placeholder="Search posts by title, content, or author..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-input"
                />
                <Search className="search-icon w-5 h-5" />
              </div>
            </form>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select min-w-48"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <Link to="/create-post" className="btn btn-primary hover-lift">
                <Plus className="w-5 h-5" />
                Create Post
              </Link>
            </div>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 animate-fadeIn">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
              <BookOpen className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-3xl font-semibold mb-4 gradient-text">No posts found</h3>
            <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
              {search || category ? 'Try adjusting your search criteria or browse all posts.' : 'Be the first to share your story with our community!'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!search && !category && (
                <Link to="/create-post" className="btn btn-primary btn-lg hover-lift">
                  <Plus className="w-5 h-5" />
                  Create First Post
                </Link>
              )}
              <button 
                onClick={() => {setSearch(''); setCategory(''); setPage(1);}} 
                className="btn btn-outline btn-lg hover-lift"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
                        className="badge badge-primary"
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
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Enhanced Pagination */}
            {pagination.pages > 1 && (
              <div className="pagination animate-fadeInUp">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="pagination-btn"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                    let pageNum;
                    if (pagination.pages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= pagination.pages - 2) {
                      pageNum = pagination.pages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`pagination-btn ${pageNum === page ? 'active' : ''}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === pagination.pages}
                  className="pagination-btn"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default PostList

