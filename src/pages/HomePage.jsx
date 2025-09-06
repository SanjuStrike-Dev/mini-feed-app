import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPosts } from '../store/slices/postsSlice';
import { useAuth } from '../hooks/useAuth';
import PostCard from '../components/PostCard';
import PostSkeleton from '../components/PostSkeleton';
import EmptyState from '../components/EmptyState';
import { Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector((state) => state.posts);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      dispatch(fetchUserPosts());
    }
  }, [dispatch, user]);

  if (isLoading && posts.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Your Posts</h1>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <PostSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading posts</h3>
        <p className="text-gray-500 mb-4">{error}</p>
        <button
          onClick={() => dispatch(fetchUserPosts())}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Your Posts</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 truncate">Welcome back, {user?.name}!</p>
        </div>
        <Link
          to="/add-post"
          className="group inline-flex items-center justify-center px-3 py-2 sm:px-4 border border-transparent text-xs sm:text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 whitespace-nowrap"
        >
          <PlusIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 group-hover:rotate-90 transition-transform duration-200" />
          <span className="hidden xs:inline">Add Post</span>
          <span className="xs:hidden">Add Post</span>
        </Link>
      </div>

      {/* Content Section */}
      {posts.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post._id || post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;