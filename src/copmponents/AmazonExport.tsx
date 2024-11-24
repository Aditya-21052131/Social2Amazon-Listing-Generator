import React, { useState } from 'react';
import { ShoppingBag, CheckCircle, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import type { ProductListing } from '../types';

interface AmazonExportProps {
  listing: ProductListing;
  isDarkMode: boolean;
  onClose: () => void;
}

export default function AmazonExport({ listing, isDarkMode, onClose }: AmazonExportProps) {
  const [step, setStep] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [category, setCategory] = useState(listing.category);
  const [fulfillment, setFulfillment] = useState<'FBA' | 'FBM'>('FBA');

  const validateListing = () => {
    const issues = [];
    if (!listing.title || listing.title.length < 10) issues.push('Title is too short');
    if (!listing.description || listing.description.length < 100) issues.push('Description is too short');
    if (!listing.bulletPoints || listing.bulletPoints.length < 3) issues.push('Need at least 3 bullet points');
    if (!listing.price || listing.price <= 0) issues.push('Invalid price');
    return issues;
  };

  const handleExport = async () => {
    const issues = validateListing();
    if (issues.length > 0) {
      issues.forEach(issue => toast.error(issue));
      return;
    }

    setIsExporting(true);
    try {
      // Simulate API call to Amazon Seller Central
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Successfully exported to Amazon Seller Central');
      onClose();
    } catch (error) {
      toast.error('Failed to export listing');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <ShoppingBag className="h-6 w-6 text-blue-500" />
              Export to Amazon
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              ×
            </button>
          </div>

          <div className="space-y-6">
            {/* Progress Steps */}
            <div className="flex justify-between mb-8">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`flex items-center ${s < 3 ? 'flex-1' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      s <= step
                        ? 'bg-blue-500 text-white'
                        : isDarkMode
                        ? 'bg-gray-700 text-gray-400'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {s < step ? <CheckCircle className="h-5 w-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`flex-1 h-0.5 ${
                        s < step
                          ? 'bg-blue-500'
                          : isDarkMode
                          ? 'bg-gray-700'
                          : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Listing Details
                </h3>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full rounded-md ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'border-gray-300'
                    }`}
                  >
                    <option value="Health & Personal Care">Health & Personal Care</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Vitamins & Supplements">Vitamins & Supplements</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Fulfillment Method
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="fulfillment"
                        value="FBA"
                        checked={fulfillment === 'FBA'}
                        onChange={(e) => setFulfillment(e.target.value as 'FBA')}
                        className="text-blue-500"
                      />
                      <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                        Fulfilled by Amazon (FBA)
                      </span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="fulfillment"
                        value="FBM"
                        checked={fulfillment === 'FBM'}
                        onChange={(e) => setFulfillment(e.target.value as 'FBM')}
                        className="text-blue-500"
                      />
                      <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                        Merchant Fulfilled
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Compliance Check
                </h3>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-blue-800'}`}>
                        Please ensure your listing complies with Amazon's policies:
                      </p>
                      <ul className={`mt-2 text-sm space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-blue-700'}`}>
                        <li>• No medical claims or health benefits</li>
                        <li>• Accurate product descriptions</li>
                        <li>• Compliant with category requirements</li>
                        <li>• High-quality images (min 1000x1000px)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Review & Submit
                </h3>
                <div className={`rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-4`}>
                  <dl className="space-y-4">
                    <div>
                      <dt className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Title</dt>
                      <dd className={`mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{listing.title}</dd>
                    </div>
                    <div>
                      <dt className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Price</dt>
                      <dd className={`mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>${listing.price}</dd>
                    </div>
                    <div>
                      <dt className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Category</dt>
                      <dd className={`mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{category}</dd>
                    </div>
                    <div>
                      <dt className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Fulfillment</dt>
                      <dd className={`mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {fulfillment === 'FBA' ? 'Fulfilled by Amazon' : 'Merchant Fulfilled'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className={`px-4 py-2 rounded-md ${
                    isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-100 hover:bg-gray-200'
                  } transition-colors`}
                >
                  Back
                </button>
              )}
              <button
                onClick={() => {
                  if (step < 3) setStep(step + 1);
                  else handleExport();
                }}
                disabled={isExporting}
                className={`px-4 py-2 rounded-md ml-auto ${
                  isExporting ? 'opacity-50 cursor-not-allowed' : ''
                } bg-blue-500 text-white hover:bg-blue-600 transition-colors`}
              >
                {isExporting
                  ? 'Exporting...'
                  : step === 3
                  ? 'Export to Amazon'
                  : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
