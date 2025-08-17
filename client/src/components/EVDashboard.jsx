// components/EVDashboard.jsx
import React, { useState, useEffect } from 'react';
import Header from './Header';
import TabNavigation from './TabNavigation';
import DashboardTab from './DashboardTab';
import LocationAnalysisTab from './LocationAnalysisTab';
import ProfitAnalysisTab from './ProfitAnalysisTab';
import MaintenanceTab from './MaintenanceTab';
import AISuggestionsPanel from './AISuggestionsPanel';
import { mockDataService, exportData } from '../services/mockDataService';

const EVDashboard = () => {
  const [activeTab, setActiveTab] = useState('analysis');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [userRole, setUserRole] = useState('analyst');
  const [suggestions, setSuggestions] = useState([]);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState([]);

  useEffect(() => {
    // Load initial data
    setSuggestions(mockDataService.aiSuggestions);
    setMaintenanceAlerts(mockDataService.maintenanceAlerts);
  }, []);

  const handleExport = (format) => {
    exportData(format);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab evSalesData={mockDataService.evSalesData} />;
      case 'analysis':
        return (
          <LocationAnalysisTab
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            evSalesData={mockDataService.evSalesData}
            locationSuggestions={mockDataService.locationSuggestions}
          />
        );
      case 'profit':
        return <ProfitAnalysisTab profitData={mockDataService.profitData} />;
      case 'maintenance':
        return (
          <MaintenanceTab
            maintenanceData={mockDataService.maintenanceData}
            maintenanceAlerts={maintenanceAlerts}
          />
        );
      default:
        return <DashboardTab evSalesData={mockDataService.evSalesData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        userRole={userRole}
        setUserRole={setUserRole}
        onExport={handleExport}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-6">
          {/* Main Content */}
          <div className="flex-1">
            <TabNavigation 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            {renderTabContent()}
          </div>

          {/* AI Suggestions Panel */}
          <AISuggestionsPanel suggestions={suggestions} />
        </div>
      </div>
    </div>
  );
};

export default EVDashboard;