# Mini Feed App

A modern, production-ready React application for sharing photos and moments. Built with React, Redux Toolkit, and Tailwind CSS with a beautiful, responsive design.

## Features

- **Smart Authentication**: Mobile number + OTP login with real-time validation
- **Mobile-First Design**: Responsive UI with modern glass morphism effects
- **Photo Sharing**: Upload, compress, and share photos with descriptions
- **Personal Feed**: View your posts in a beautiful grid layout
- **Modern UI**: Clean, intuitive interface with smooth animations and hover effects
- **State Management**: Redux Toolkit with optimistic updates
- **Image Modal**: Full-screen image viewing with smooth transitions
- **Image Compression**: Automatic image optimization and file size management

## Tech Stack

- **Frontend**: React 19, Vite
- **State Management**: Redux Toolkit, React Redux
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Heroicons
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns
- **UI Components**: Headless UI for modals and transitions

## Prerequisites

- Node.js (v20.16.0 or higher)
- npm or yarn

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mini-feed-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## Demo

- **Test Mobile Number**: `+1234567890` (or any valid format)
- **Test OTP**: `123456`
- **Features**: Upload images, add descriptions, view your feed

## Usage

### Authentication

1. **Registration**: Enter your mobile number and full name to create an account
2. **Login**: Use your mobile number and the static OTP `123456` for testing
3. **Logout**: Click the logout button in the sidebar

### Creating Posts

1. Navigate to "Add Post" from the sidebar or homepage
2. Click to upload an image (supports PNG, JPG, GIF up to 10MB)
3. Add a description (up to 500 characters)
4. Click "Create Post" to publish
5. Images are automatically compressed for optimal storage

### Viewing Posts

- Your posts are displayed in a beautiful responsive grid layout
- Each post shows the image, description, and creation date
- Click any image to view it in full-screen modal
- Posts are fetched from the backend API

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.jsx      # Main layout with responsive navigation
│   ├── PostCard.jsx    # Modern post card with hover effects
│   ├── PostSkeleton.jsx # Loading skeleton component
│   ├── EmptyState.jsx  # Beautiful empty state with CTAs
│   └── ImageModal.jsx  # Full-screen image viewer
├── hooks/              # Custom React hooks
│   ├── useAuth.js      # Authentication hook
│   └── usePageTitle.js # Dynamic page titles
├── pages/              # Page components
│   ├── LoginPage.jsx   # Modern auth page with validation
│   ├── HomePage.jsx    # Clean feed page
│   └── AddPostPage.jsx # Enhanced post creation
├── services/           # API and business logic
│   ├── authService.js  # Authentication service
│   └── postsService.js # Posts with image compression
├── store/              # Redux store configuration
│   ├── index.js        # Store setup
│   └── slices/         # Redux slices
│       ├── authSlice.js    # Authentication state
│       └── postsSlice.js   # Posts state
├── utils/              # Utility functions
│   └── imageUtils.js   # Image compression utilities
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Features Implementation

### Authentication System
- Clean login/signup with real-time validation
- Static OTP validation (123456 for testing)
- Protected routes with automatic redirects
- User session management with JWT tokens

### Modern UI/UX
- **Responsive Design**: Mobile-first with desktop optimization
- **Loading States**: Smart skeleton loaders and error handling
- **Toast Notifications**: Real-time user feedback

### Image Management
- **Smart Compression**: Automatic image optimization
- **Full-Screen Modal**: Beautiful image viewing experience
- **File Validation**: Type and size validation
- **Format Support**: PNG, JPG, GIF up to 10MB

### State Management
- Redux Toolkit with async thunks
- Clean state management for auth and posts
- Error handling and loading states
- API integration with backend

## Design Highlights

### UI Components
- **Clean Homepage**: Simplified header with focus on content
- **Enhanced Post Cards**: Hover effects, smooth animations, gradient accents
- **Beautiful Empty State**: Engaging design with clear call-to-action
- **Modern Forms**: Real-time validation with visual feedback
- **Responsive Navigation**: Mobile-first sidebar with smooth transitions

### Styling
- **Gradient Accents**: Subtle indigo-to-cyan gradients throughout
- **Glass Morphism**: Backdrop blur effects for modern feel
- **Smooth Animations**: Micro-interactions and hover effects
- **Consistent Spacing**: Professional layout with proper visual hierarchy

### User Experience
- **Intuitive Navigation**: Clear, accessible interface
- **Visual Feedback**: Loading states, error handling, success messages
- **Mobile Optimized**: Touch-friendly design with proper spacing

## Testing the Application

1. **Register a new account**:
   - Enter any mobile number (e.g., +1234567890)
   - Enter your name
   - Click "Create account"

2. **Login with existing account**:
   - Enter your mobile number
   - Use OTP: `123456`
   - Click "Sign in"

3. **Create posts**:
   - Click "Add Post" or the "+" button
   - Upload an image
   - Add a description
   - Click "Create Post"

4. **View your feed**:
   - Your posts will appear on the homepage
   - Posts are sorted by creation date (newest first)

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- **Real OTP System**: SMS/Email verification instead of static OTP
- **Pagination**: Load more posts functionality
- **Search**: Find posts by description
- **User Profiles**: Enhanced profile pages with avatars
- **Social Features**: Likes, comments, sharing
- **Push Notifications**: Real-time updates
- **Offline Support**: Service workers for offline functionality
- **Analytics**: User engagement tracking
- **Admin Panel**: Content moderation features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request


## Support

For support or questions, please open an issue in the repository.

---

**Made with ❤️ using React, Redux Toolkit, and Tailwind CSS**

