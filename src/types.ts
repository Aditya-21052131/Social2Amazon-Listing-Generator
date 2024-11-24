export interface ProductListing {
  title: string;
  description: string;
  bulletPoints: string[];
  category: string;
  keywords: string[];
  price: number;
  images?: string[];
  suggestedTitles?: string[];
  competitorPrices?: CompetitorPrice[];
  priceHistory?: PricePoint[];
  sentiment?: SentimentAnalysis;
  aiSuggestions?: AISuggestions;
}

export interface SocialPost {
  platform: 'instagram' | 'tiktok' | 'youtube';
  content: string;
  url: string;
}

export interface CompetitorPrice {
  name: string;
  price: number;
}

export interface PricePoint {
  date: string;
  price: number;
}

export interface SentimentAnalysis {
  score: number;
  positiveKeywords: string[];
  negativeKeywords: string[];
}

export interface AISuggestions {
  recommendedPrice: number;
  targetAudience: string[];
  marketingAngles: string[];
  seasonalTrends: string[];
}