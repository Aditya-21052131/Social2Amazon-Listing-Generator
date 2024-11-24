import React from 'react';
import { Lightbulb } from 'lucide-react';

interface TitleSuggestionsProps {
  titles: string[];
  onSelect: (title: string) => void;
  isDarkMode: boolean;
}

export default function TitleSuggestions({ titles, onSelect, isDarkMode }: TitleSuggestionsProps) {
  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 transition-colors`}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-yellow-500" />
        AI-Suggested Titles
      </h2>
      <div className="space-y-2">
        {titles.map((title, index) => (
          <button
            key={index}
            onClick={() => onSelect(title)}
            className={`w-full text-left p-3 rounded-md ${
              isDarkMode
                ? 'hover:bg-gray-700 focus:bg-gray-700'
                : 'hover:bg-gray-50 focus:bg-gray-50'
            } transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500`}
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  );
}