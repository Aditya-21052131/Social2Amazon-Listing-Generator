import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import PostAnalyzer from './components/PostAnalyzer';
import ListingPreview from './components/ListingPreview';
import TitleSuggestions from './components/TitleSuggestions';
import MarketInsights from './components/MarketInsights';
import type { ProductListing, SocialPost } from './types';

function App() {
  const [listing, setListing] = useState<ProductListing>();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const analyzeSocialPost = async (content: string) => {
    const keywords = content.toLowerCase()
      .split(' ')
      .filter(word => word.length > 3)
      .slice(0, 5);

    const bulletPoints = [
      "100% ORGANIC: Pure and natural ingredients",
      "PREMIUM QUALITY: Highest grade available",
      "LAB TESTED: Third-party verified for purity",
      "SUSTAINABLY SOURCED: Environmentally conscious practices",
      "SATISFACTION GUARANTEED: Love it or your money back"
    ];

    // Simulated AI-generated data
    return {
      title: "Premium Wellness Product",
      description: content.slice(0, 500) + "...",
      bulletPoints,
      category: "Health & Personal Care",
      keywords,
      price: 29.99,
      images: [
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
      ],
      suggestedTitles: [
        "Premium Organic Wellness Supplement",
        "Natural Health Booster",
        "Pure Wellness Formula"
      ],
      competitorPrices: [
        { name: "Competitor A", price: 34.99 },
        { name: "Competitor B", price: 27.99 },
        { name: "Competitor C", price: 31.99 }
      ],
      priceHistory: [
        { date: "2024-01", price: 32.99 },
        { date: "2024-02", price: 30.99 },
        { date: "2024-03", price: 29.99 }
      ],
      sentiment: {
        score: 0.85,
        positiveKeywords: ["natural", "effective", "quality", "pure"],
        negativeKeywords: ["expensive", "shipping"]
      },
      aiSuggestions: {
        recommendedPrice: 29.99,
        targetAudience: [
          "Health Enthusiasts",
          "Organic Product Lovers",
          "Wellness Focused",
          "Age 25-45"
        ],
        marketingAngles: [
          "Focus on natural ingredients",
          "Highlight lab testing",
          "Emphasize sustainability",
          "Stress quality assurance"
        ],
        seasonalTrends: [
          "Peak demand in January (New Year)",
          "Summer wellness focus",
          "Holiday gift potential",
          "Spring cleanse season"
        ]
      }
    };
  };

  const handleAnalysis = async (post: SocialPost) => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const generatedListing = await analyzeSocialPost(post.content);
      setListing(generatedListing);
    } catch (error) {
      console.error('Error generating listing:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = async () => {
    if (!listing) return;
    alert('Listing ready for export to Amazon Seller Central!');
  };

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <Toaster position="top-right" />
      <Header isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      
      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <PostAnalyzer 
              onAnalysis={handleAnalysis} 
              isGenerating={isGenerating}
              isDarkMode={isDarkMode}
            />
            {listing && (
              <TitleSuggestions 
                titles={listing.suggestedTitles} 
                onSelect={(title) => setListing({ ...listing, title })}
                isDarkMode={isDarkMode}
              />
            )}
            {listing && (
              <MarketInsights
                listing={listing}
                isDarkMode={isDarkMode}
              />
            )}
          </div>
          <ListingPreview 
            listing={listing} 
            onExport={handleExport}
            isDarkMode={isDarkMode}
          />
        </div>
      </main>
    </div>
  );
}

export default App;