import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { postService } from '../services/api'
import { Calendar, User, Eye, MessageCircle, ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

const PostDetail = () => {
  const { id } = useParams()

  const { data: post, isLoading, error } = useQuery(
    ['post', id],
    () => postService.getPost(id),
    {
      select: (data) => data.data,
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

  if (error || !post) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h2>
          <p className="text-gray-600 mb-6">The post you're looking for doesn't exist.</p>
          <Link to="/posts" className="btn btn-primary">
            View All Posts
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/posts" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Posts
        </Link>

        {/* Post Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="badge badge-primary"
              style={{ backgroundColor: post.category?.color + '20', color: post.category?.color }}
            >
              {post.category?.name}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author?.firstName ? `${post.author.firstName} ${post.author.lastName}` : post.author?.username}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(post.createdAt), 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{post.viewCount} views</span>
            </div>
            {post.comments && (
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments.length} comments</span>
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && post.featuredImage !== 'default-post.jpg' && (
          <div className="mb-8">
            <img
              src={`/uploads/${post.featuredImage}`}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Post Content */}
        <article className="prose prose-lg max-w-none mb-8">
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {post.content}
          </div>
        </article>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="badge badge-secondary">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        {post.comments && post.comments.length > 0 && (
          <div className="border-t pt-8">
            <h3 className="text-2xl font-bold mb-6">Comments ({post.comments.length})</h3>
            <div className="space-y-6">
              {post.comments.map((comment, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {comment.user?.firstName ? comment.user.firstName[0] : comment.user?.username[0]}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">
                        {comment.user?.firstName ? `${comment.user.firstName} ${comment.user.lastName}` : comment.user?.username}
                      </div>
                      <div className="text-sm text-gray-500">
                        {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostDetail

