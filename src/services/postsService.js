
import { compressImage, getImageSize, formatFileSize } from '../utils/imageUtils';
import { authService } from './authService';

const API_BASE_URL = 'https://mini-feed-app-backend-production.up.railway.app';

class PostsService {
  async makeRequest(url, options = {}) {
    const token = authService.getAuthToken();
    
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  }

  async getUserPosts() {
    try {
      const response = await this.makeRequest('/posts?mine=true');
      return response.data || [];
    } catch (error) {
      throw new Error(error.message || 'Failed to load posts');
    }
  }

  async getAllPosts() {
    try {
      const response = await this.makeRequest('/posts');
      return response.data || [];
    } catch (error) {
      throw new Error(error.message || 'Failed to load posts');
    }
  }

  async createPost(description, imageFile) {
    if (!description || description.trim().length < 1) {
      throw new Error('Please enter a description for your post.');
    }

    if (!imageFile) {
      throw new Error('Please select an image for your post.');
    }

    try {
      const compressedImage = await compressImage(imageFile, 1200, 0.8);
      const imageSize = getImageSize(compressedImage);
      const maxSize = 2 * 1024 * 1024;
      
      if (imageSize > maxSize) {
        throw new Error(`Image is too large (${formatFileSize(imageSize)}). Please choose a smaller image.`);
      }

      const response = await this.makeRequest('/posts', {
        method: 'POST',
        body: JSON.stringify({
          description: description.trim(),
          imageBase64: compressedImage
        }),
      });

      return response.data;
    } catch (error) {
      if (error.message.includes('too large')) {
        throw error;
      }
      throw new Error(error.message || 'Failed to create post');
    }
  }

  async fileToBase64(file) {
    try {
      return await compressImage(file, 1200, 0.8);
    } catch (error) {
      throw new Error('Failed to process image file');
    }
  }

}

export const postsService = new PostsService();
