import React from 'react'
import { useAuth } from '../App'
import { User, Mail, Calendar, Edit } from 'lucide-react'
import { format } from 'date-fns'

const Profile = () => {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Not Found</h2>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.firstName ? user.firstName[0] : user.username[0]}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {user.firstName ? `${user.firstName} ${user.lastName}` : user.username}
              </h1>
              <p className="text-gray-600">@{user.username}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-gray-600">{user.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-medium">Role</div>
                    <div className="text-gray-600 capitalize">{user.role}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-medium">Member Since</div>
                    <div className="text-gray-600">
                      {format(new Date(user.createdAt), 'MMMM d, yyyy')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Bio</h2>
              {user.bio ? (
                <p className="text-gray-700">{user.bio}</p>
              ) : (
                <p className="text-gray-500 italic">No bio available</p>
              )}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t">
            <button className="btn btn-primary flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
