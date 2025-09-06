import { useState } from 'react';
import { format } from 'date-fns';
import ImageModal from './ImageModal';

const PostCard = ({ post }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-1">
      {/* Post Image */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {!imageLoaded && (
          <div className="animate-pulse bg-gradient-to-br from-gray-200 to-gray-300 h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 w-full flex items-center justify-center">
            <div className="text-center">
              <svg className="h-12 w-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-2 text-xs text-gray-500">Loading...</p>
            </div>
          </div>
        )}
        
        {imageError ? (
          <div className="h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 w-full bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="mt-2 text-sm text-red-600 font-medium">Failed to load image</p>
            </div>
          </div>
        ) : (
          <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 w-full group/image">
            <img
              src={post.imageUrl || post.imageBase64}
              alt={post.description}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
            
            {/* Zoom icon in top-right corner */}
            <div 
              className="absolute top-3 right-3 opacity-0 group-hover/image:opacity-100 transition-all duration-300 cursor-pointer z-10 transform translate-y-1 group-hover/image:translate-y-0"
              onClick={handleImageClick}
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110">
                <svg className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
            
            {/* Clickable overlay for the entire image */}
            <div 
              className="absolute inset-0 cursor-pointer"
              onClick={handleImageClick}
            />
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="p-5">
        <p className="text-gray-900 text-sm leading-relaxed mb-4 line-clamp-3 capitalize">
          {post.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"></div>
            <span className="text-xs text-gray-500 font-medium">
              {format(new Date(post.createdAt), 'MMM dd, yyyy')}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-xs text-gray-400">#</span>
            <span className="text-xs font-mono font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              {(post._id || post.id).slice(-6)}
            </span>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={post.imageUrl || post.imageBase64}
        alt={post.description}
      />
    </div>
  );
};

export default PostCard;
