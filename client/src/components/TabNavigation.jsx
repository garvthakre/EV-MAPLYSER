// components/TabNavigation.jsx
import React from 'react';
import { MapPin, DollarSign, Settings, BarChart3 } from 'lucide-react';

const TabButton = ({ id, icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-blue-600 text-white shadow-lg' 
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    <Icon size={18} />
    <span className="font-medium">{label}</span>
  </button>
);

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'analysis', icon: MapPin, label: 'Location Analysis' },
    { id: 'profit', icon: DollarSign, label: 'Profit Analysis' },
    { id: 'maintenance', icon: Settings, label: 'Maintenance' }
  ];

  return (
    <div className="flex space-x-2 mb-6">
      {tabs.map((tab) => (
        <TabButton 
          key={tab.id}
          id={tab.id} 
          icon={tab.icon} 
          label={tab.label} 
          isActive={activeTab === tab.id} 
          onClick={setActiveTab} 
        />
      ))}
    </div>
  );
};

export default TabNavigation;