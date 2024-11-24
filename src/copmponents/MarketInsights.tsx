import React from 'react';
import { TrendingUp, Users, Target, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { ProductListing } from '../types';

interface MarketInsightsProps {
  listing?: ProductListing;
  isDarkMode: boolean;
}

export default function MarketInsights({ listing, isDarkMode }: MarketInsightsProps) {
  if (!listing?.aiSuggestions || !listing?.priceHistory) return null;

  const { aiSuggestions, priceHistory, competitorPrices, sentiment } = listing;

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 transition-colors`}>
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-blue-500" />
        Market Insights
      </h2>

      <div className="space-y-8">
        {/* Price Analysis */}
        <div>
          <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Price Analysis
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceHistory}>
                <XAxis 
                  dataKey="date" 
                  stroke={isDarkMode ? '#9CA3AF' : '#4B5563'}
                />
                <YAxis 
                  stroke={isDarkMode ? '#9CA3AF' : '#4B5563'}
                  domain={['auto', 'auto']}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? '#1F2937' : 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: isDarkMode ? 'white' : 'black'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Recommended Price
              </p>
              <p className="text-xl font-bold text-purple-600">
                ${aiSuggestions.recommendedPrice.toFixed(2)}
              </p>
            </div>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Average Competitor Price
              </p>
              <p className="text-xl font-bold text-blue-600">
                ${(competitorPrices?.reduce((acc, curr) => acc + curr.price, 0) || 0 / (competitorPrices?.length || 1)).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div>
          <h3 className={`text-lg font-medium mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <Users className="h-5 w-5 text-green-500" />
            Target Audience
          </h3>
          <div className="flex flex-wrap gap-2">
            {aiSuggestions.targetAudience.map((audience, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm ${
                  isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-green-100 text-green-800'
                }`}
              >
                {audience}
              </span>
            ))}
          </div>
        </div>

        {/* Marketing Angles */}
        <div>
          <h3 className={`text-lg font-medium mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <Target className="h-5 w-5 text-orange-500" />
            Marketing Angles
          </h3>
          <ul className="space-y-2">
            {aiSuggestions.marketingAngles.map((angle, index) => (
              <li 
                key={index}
                className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                {angle}
              </li>
            ))}
          </ul>
        </div>

        {/* Seasonal Trends */}
        <div>
          <h3 className={`text-lg font-medium mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <Calendar className="h-5 w-5 text-pink-500" />
            Seasonal Trends
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {aiSuggestions.seasonalTrends.map((trend, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-pink-50'
                }`}
              >
                <p className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {trend}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment Analysis */}
        {sentiment && (
          <div>
            <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Sentiment Analysis
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500"
                  style={{ width: `${sentiment.score * 100}%` }}
                />
              </div>
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {(sentiment.score * 100).toFixed(0)}%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Positive Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {sentiment.positiveKeywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Areas for Improvement
                </h4>
                <div className="flex flex-wrap gap-2">
                  {sentiment.negativeKeywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}