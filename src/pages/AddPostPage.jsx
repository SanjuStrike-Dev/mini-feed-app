import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../store/slices/postsSlice';
import { postsService } from '../services/postsService';
import toast from 'react-hot-toast';
import { 
  PhotoIcon,
  XMarkIcon,
  ArrowLeftIcon 
} from '@heroicons/react/24/outline';

const AddPostPage = () => {
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCreating, error } = useSelector((state) => state.posts);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size should be less than 10MB');
        return;
      }

      setSelectedImage(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
      toast.success(`Image selected (${sizeInMB}MB) - will be compressed automatically`);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!description.trim()) {
      toast.error('Please enter a description for your post');
      return;
    }

    if (!selectedImage) {
      toast.error('Please select an image for your post');
      return;
    }

    setIsSubmitting(true);

    try {
      await dispatch(createPost({ 
        description: description.trim(), 
        image: selectedImage 
      })).unwrap();

      toast.success('Post created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error || 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <button
          onClick={handleBack}
          className="group inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 mb-6 transition-colors duration-200"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Home
        </button>
        
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Create New Post
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Image Upload Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            Photo
          </label>
          
          {!imagePreview ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="group border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-indigo-300 hover:bg-indigo-50/50 cursor-pointer transition-all duration-300"
            >
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-100 to-cyan-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <PhotoIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold text-indigo-600 group-hover:text-indigo-700">
                    Click to upload
                  </span>{' '}
                  or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          ) : (
            <div className="relative group">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-2xl shadow-sm"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-2xl transition-colors duration-300"></div>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-all duration-200 hover:scale-110 shadow-lg"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-4">
            Description
          </label>
          <div className="relative">
            <textarea
              id="description"
              name="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200 resize-none"
              placeholder="What's on your mind? Share your thoughts..."
              maxLength={500}
            />
            <div className="absolute bottom-3 right-3">
              <div className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg">
                <span className="text-xs font-medium text-gray-500">{description.length}/500</span>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"></div>
            <span className="text-xs text-gray-500">Share what you're thinking</span>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-3 border border-gray-200 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isCreating || !description.trim() || !selectedImage}
            className="px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg"
          >
            {isSubmitting || isCreating ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating...
              </div>
            ) : (
              'Create Post'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPostPage;
