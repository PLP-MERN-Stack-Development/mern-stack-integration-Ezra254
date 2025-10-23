# MERN Stack Blog Application

A full-stack blog application built with MongoDB, Express.js, React.js, and Node.js. This project demonstrates seamless integration between front-end and back-end components, including database operations, API communication, and state management.

## 🚀 Features

### Backend Features
- **RESTful API** with comprehensive endpoints for posts, categories, and authentication
- **User Authentication** with JWT tokens and password hashing
- **MongoDB Integration** with Mongoose ODM
- **Input Validation** using express-validator
- **Error Handling** middleware for consistent error responses
- **File Upload** support for featured images
- **Comments System** for blog posts
- **Search Functionality** across posts
- **Pagination** for better performance
- **Role-based Access Control** (User, Admin, Moderator)

### Frontend Features
- **Modern React** with hooks and context API
- **Responsive Design** with mobile-first approach
- **React Router** for navigation
- **React Query** for efficient data fetching and caching
- **Form Handling** with react-hook-form
- **Toast Notifications** for user feedback
- **Protected Routes** for authenticated users
- **Real-time UI Updates** with optimistic updates

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **multer** - File upload handling
- **cors** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **React Query** - Data fetching and caching
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **date-fns** - Date manipulation
- **react-hot-toast** - Toast notifications

## 📁 Project Structure

```
mern-stack-integration-Ezra254/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Layout.jsx
│   │   │   ├── Navigation.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── PostList.jsx
│   │   │   ├── PostDetail.jsx
│   │   │   ├── PostForm.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/           # API services
│   │   │   └── api.js
│   │   ├── App.jsx             # Main app component
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
├── server/                     # Node.js backend
│   ├── models/                 # Mongoose models
│   │   ├── Post.js
│   │   ├── Category.js
│   │   └── User.js
│   ├── routes/                 # API routes
│   │   ├── posts.js
│   │   ├── categories.js
│   │   └── auth.js
│   ├── middleware/             # Custom middleware
│   │   └── auth.js
│   ├── server.js               # Main server file
│   ├── package.json
│   └── .env.example
├── README.md
└── Week4-Assignment.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-stack-integration-Ezra254
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**

   **Server (.env)**
   ```bash
   cd ../server
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mern-blog
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   ```

   **Client (.env)**
   ```bash
   cd ../client
   cp .env.example .env
   ```
   
   Update the `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=MERN Blog
   ```

5. **Start MongoDB**
   - If using local MongoDB: `mongod`
   - If using MongoDB Atlas: Ensure your connection string is correct

6. **Start the development servers**

   **Terminal 1 - Backend**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Frontend**
   ```bash
   cd client
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Posts Endpoints

#### Get All Posts
```http
GET /api/posts?page=1&limit=10&category=categoryId&search=query
```

#### Get Single Post
```http
GET /api/posts/:id
```

#### Create Post
```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Post Title",
  "content": "Post content...",
  "category": "categoryId",
  "excerpt": "Post excerpt",
  "tags": ["tag1", "tag2"],
  "isPublished": true
}
```

#### Update Post
```http
PUT /api/posts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

#### Delete Post
```http
DELETE /api/posts/:id
Authorization: Bearer <token>
```

#### Add Comment
```http
POST /api/posts/:id/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Comment content"
}
```

### Categories Endpoints

#### Get All Categories
```http
GET /api/categories
```

#### Create Category (Admin only)
```http
POST /api/categories
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Technology",
  "description": "Posts about technology",
  "color": "#3B82F6"
}
```

## 🎨 Features Implemented

### Core Features ✅
- [x] User registration and authentication
- [x] JWT-based authentication
- [x] Password hashing with bcrypt
- [x] CRUD operations for posts
- [x] Category management
- [x] Comment system
- [x] Search functionality
- [x] Pagination
- [x] Responsive design
- [x] Protected routes
- [x] Error handling
- [x] Input validation
- [x] File upload support
- [x] Role-based access control

### Advanced Features ✅
- [x] Optimistic UI updates
- [x] Real-time notifications
- [x] Loading states
- [x] Error boundaries
- [x] SEO-friendly URLs (slugs)
- [x] View count tracking
- [x] User profiles
- [x] Admin dashboard capabilities

## 🔧 Development

### Available Scripts

**Server**
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm test         # Run tests
npm run seed     # Seed database with sample data
```

**Client**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Database Schema

#### User Model
```javascript
{
  username: String (required, unique)
  email: String (required, unique)
  password: String (required, hashed)
  firstName: String
  lastName: String
  avatar: String
  bio: String
  role: String (enum: 'user', 'admin', 'moderator')
  isActive: Boolean
  lastLogin: Date
  createdAt: Date
  updatedAt: Date
}
```

#### Post Model
```javascript
{
  title: String (required)
  content: String (required)
  featuredImage: String
  slug: String (required, unique)
  excerpt: String
  author: ObjectId (ref: User)
  category: ObjectId (ref: Category)
  tags: [String]
  isPublished: Boolean
  viewCount: Number
  comments: [{
    user: ObjectId (ref: User)
    content: String
    createdAt: Date
  }]
  createdAt: Date
  updatedAt: Date
}
```

#### Category Model
```javascript
{
  name: String (required, unique)
  description: String
  slug: String (required, unique)
  color: String (hex color)
  isActive: Boolean
  createdAt: Date
  updatedAt: Date
}
```

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Create a Heroku app
2. Set environment variables
3. Connect to MongoDB Atlas
4. Deploy with Git

### Frontend Deployment (Vercel/Netlify)
1. Build the React app
2. Deploy to Vercel or Netlify
3. Update API URLs for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Ezra254**
- GitHub: [@Ezra254](https://github.com/Ezra254)

## 🙏 Acknowledgments

- MongoDB for the database
- Express.js team for the web framework
- React team for the frontend library
- All the open-source contributors who made this project possible

---

**Note**: This is a demonstration project for learning MERN stack development. For production use, please implement additional security measures, error handling, and testing.