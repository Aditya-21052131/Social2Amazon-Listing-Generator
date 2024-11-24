import React, { useState } from 'react';
import { MessageSquare, AlertCircle, Loader, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import type { SocialPost } from '../types';

interface PostAnalyzerProps {
  onAnalysis: (data: SocialPost) => void;
  isGenerating: boolean;
  isDarkMode: boolean;
}

export default function PostAnalyzer({ onAnalysis, isGenerating, isDarkMode }: PostAnalyzerProps) {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState<SocialPost['platform']>('instagram');
  const [content, setContent] = useState('');
  const maxLength = 2000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.length > maxLength) {
      toast.error(`Content exceeds ${maxLength} characters`);
      return;
    }
    onAnalysis({ platform, content, url });
  };

  const handleImagePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    const imageItem = Array.from(items).find(item => item.type.indexOf('image') !== -1);
    
    if (imageItem) {
      toast.success('Image detected! Images will be processed during analysis.');
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 transition-colors`}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-purple-600" />
        Analyze Social Media Post
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
            Platform
          </label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as SocialPost['platform'])}
            className={`mt-1 block w-full rounded-md ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'border-gray-300'
            } focus:border-purple-500 focus:ring-purple-500`}
            disabled={isGenerating}
          >
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
            Post URL
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            className={`mt-1 block w-full rounded-md ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'border-gray-300'
            } focus:border-purple-500 focus:ring-purple-500`}
            required
            disabled={isGenerating}
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Post Content
            </label>
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {content.length}/{maxLength}
            </span>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onPaste={handleImagePaste}
            rows={4}
            className={`mt-1 block w-full rounded-md ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'border-gray-300'
            } focus:border-purple-500 focus:ring-purple-500`}
            placeholder="Paste your post content here..."
            required
            disabled={isGenerating}
          />
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <ImageIcon className="h-4 w-4" />
            <span>Paste images directly or drag & drop</span>
          </div>
        </div>

        <div className={`${
          isDarkMode ? 'bg-yellow-900/50' : 'bg-yellow-50'
        } p-4 rounded-md flex items-start gap-2`}>
          <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className={`text-sm ${isDarkMode ? 'text-yellow-200' : 'text-yellow-700'}`}>
            Ensure your content complies with Amazon's listing policies. The AI will help optimize your listing while maintaining compliance.
          </p>
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <Loader className="h-5 w-5 animate-spin" />
              Generating Listing...
            </>
          ) : (
            'Generate Listing'
          )}
        </button>
      </form>
    </div>
  );
}