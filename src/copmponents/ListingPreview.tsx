import React, { useState } from 'react';
import { Package, Tag, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProductListing } from '../types';
import AmazonExport from './AmazonExport';

interface ListingPreviewProps {
  listing?: ProductListing;
  onExport: () => void;
  isDarkMode: boolean;
}

export default function ListingPreview({ listing, onExport, isDarkMode }: ListingPreviewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showExport, setShowExport] = useState(false);

  if (!listing) {
    return (
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 flex items-center justify-center min-h-[200px] transition-colors`}>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center`}>
          Enter your social media post details to generate an Amazon listing preview
        </p>
      </div>
    );
  }

  const nextImage = () => {
    if (listing.images) {
      setCurrentImageIndex((prev) => (prev + 1) % listing.images!.length);
    }
  };

  const prevImage = () => {
    if (listing.images) {
      setCurrentImageIndex((prev) => (prev - 1 + listing.images!.length) % listing.images!.length);
    }
  };

  return (
    <>
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 transition-colors`}>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-purple-600" />
          Amazon Listing Preview
        </h2>

        <div className="space-y-6">
          {listing.images && listing.images.length > 0 && (
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={listing.images[currentImageIndex]}
                alt={`Product image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              {listing.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {listing.images.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <div>
            <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {listing.title}
            </h3>
            <div className="mt-2 flex items-center gap-2">
              <Tag className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className="text-lg font-bold text-green-600">
                ${listing.price.toFixed(2)}
              </span>
            </div>
          </div>

          <div>
            <h4 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              About this item
            </h4>
            <ul className="space-y-2">
              {listing.bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Product Description
            </h4>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} whitespace-pre-wrap`}>
              {listing.description}
            </p>
          </div>

          <div>
            <h4 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Category
            </h4>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {listing.category}
            </span>
          </div>

          <div>
            <h4 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Search Terms
            </h4>
            <div className="flex flex-wrap gap-2">
              {listing.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    isDarkMode 
                      ? 'bg-gray-700 text-gray-200' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowExport(true)}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Export to Amazon
        </button>
      </div>

      {showExport && listing && (
        <AmazonExport
          listing={listing}
          isDarkMode={isDarkMode}
          onClose={() => setShowExport(false)}
        />
      )}
    </>
  );
}