const PostSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      {/* Image skeleton */}
      <div className="relative">
        <div className="animate-pulse bg-gradient-to-br from-gray-200 to-gray-300 h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 w-full"></div>
        <div className="absolute top-3 right-3">
          <div className="animate-pulse bg-white/80 rounded-full p-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="p-5 space-y-4">
        <div className="space-y-3">
          <div className="animate-pulse bg-gray-200 h-4 w-full rounded-lg"></div>
          <div className="animate-pulse bg-gray-200 h-4 w-4/5 rounded-lg"></div>
          <div className="animate-pulse bg-gray-200 h-4 w-3/5 rounded-lg"></div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="animate-pulse bg-gray-300 w-2 h-2 rounded-full"></div>
            <div className="animate-pulse bg-gray-200 h-3 w-16 rounded"></div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="animate-pulse bg-gray-200 h-3 w-2 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-3 w-12 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
