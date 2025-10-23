import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { postService, categoryService } from '../services/api'
import { Calendar, User, Eye, Search, Filter } from 'lucide-react'
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

  const { posts, pagination } = postsData || { posts: [], pagination: {} }
  const categories = categoriesData || []

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">All Posts</h1>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </form>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-select"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts found</h3>
          <p className="text-gray-600 mb-6">
            {search || category ? 'Try adjusting your search criteria.' : 'Be the first to share your story!'}
          </p>
          {!search && !category && (
            <Link to="/create-post" className="btn btn-primary">
              Create First Post
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
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
              </article>
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="btn btn-outline"
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`btn btn-sm ${
                      pageNum === page ? 'btn-primary' : 'btn-outline'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.pages}
                className="btn btn-outline"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default PostList
