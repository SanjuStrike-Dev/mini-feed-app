import { Link } from 'react-router-dom';
import { PlusIcon, PhotoIcon, SparklesIcon } from '@heroicons/react/24/outline';

const EmptyState = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 rounded-3xl"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100/50 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-100/50 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative text-center py-16 px-8">
        {/* Icon with gradient background */}
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-indigo-100 to-cyan-100 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
          <div className="relative">
            <PhotoIcon className="h-12 w-12 text-indigo-600" />
            <SparklesIcon className="h-6 w-6 text-cyan-500 absolute -top-1 -right-1" />
          </div>
        </div>
        
        {/* Content */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Your feed is waiting</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg leading-relaxed">
          Ready to share your first moment? Upload a photo and tell your story to get started on your journey.
        </p>
        
        {/* CTA Button */}
        <Link
          to="/add-post"
          className="group inline-flex items-center px-8 py-4 border border-transparent text-base font-semibold rounded-2xl text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        >
          <PlusIcon className="h-5 w-5 mr-3 group-hover:rotate-90 transition-transform duration-300" />
          Create your first post
        </Link>
        
        {/* Additional info */}
        <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <span>Easy to use</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
            <span>Instant sharing</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span>Your story</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
