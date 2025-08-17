// components/AISuggestionsPanel.jsx
import React from 'react';
import { MessageSquare } from 'lucide-react';

const AISuggestionsPanel = ({ suggestions = [] }) => {
  return (
    <div className="w-80">
      <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <MessageSquare className="mr-2 text-purple-600" />
          AI Suggestions
        </h3>
        
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm text-gray-700">{suggestion}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h4 className="text-md font-semibold text-gray-800 mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Generate Report
            </button>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
              Schedule Analysis
            </button>
            <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm">
              Set Alerts
            </button>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-md font-semibold text-gray-800 mb-3">Feedback</h4>
          <textarea 
            placeholder="Share your feedback or flag data issues..."
            className="w-full h-20 p-3 border border-gray-300 rounded-lg text-sm resize-none"
          />
          <button className="w-full mt-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default AISuggestionsPanel;