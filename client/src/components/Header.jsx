// components/Header.jsx
import React from 'react';
import { Zap, Download, User } from 'lucide-react';

const Header = ({ userRole, setUserRole, onExport }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Zap className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold text-gray-900">EV-MAPLYSER</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <select 
              value={userRole} 
              onChange={(e) => setUserRole(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
            >
              <option value="analyst">Analyst</option>
              <option value="planner">Planner</option>
              <option value="investor">Investor</option>
              <option value="admin">Admin</option>
            </select>
            
            <button 
              onClick={() => onExport('csv')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download size={16} />
              <span>Export</span>
            </button>
            
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={18} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;