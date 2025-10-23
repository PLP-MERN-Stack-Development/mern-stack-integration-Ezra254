import React from 'react'
import { useAuth } from '../App'
import { Plus } from 'lucide-react'

const PostForm = () => {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in to create posts.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
              <Plus className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Create New Post</h1>
          </div>

          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Post Form Coming Soon</h3>
            <p className="text-gray-600 mb-6">
              The post creation form will be implemented in the next phase of development.
            </p>
            <div className="text-sm text-gray-500">
              This would include fields for title, content, category selection, tags, and featured image upload.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostForm
