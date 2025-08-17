// services/mockDataService.js

// Mock data service to centralize all data
export const mockDataService = {
  evSalesData: [
    { month: 'Jan', sales: 120, stations: 5 },
    { month: 'Feb', sales: 135, stations: 6 },
    { month: 'Mar', sales: 180, stations: 8 },
    { month: 'Apr', sales: 220, stations: 10 },
    { month: 'May', sales: 290, stations: 12 },
    { month: 'Jun', sales: 340, stations: 15 }
  ],

  profitData: [
    { year: '2023', revenue: 50000, costs: 35000, profit: 15000 },
    { year: '2024', revenue: 75000, costs: 45000, profit: 30000 },
    { year: '2025', revenue: 120000, costs: 65000, profit: 55000 }
  ],

  locationSuggestions: [
    { area: 'Tech Park District', score: 95, evSales: 340, population: 45000, competition: 'Low' },
    { area: 'Shopping Mall Complex', score: 88, evSales: 280, population: 35000, competition: 'Medium' },
    { area: 'Residential Zone A', score: 82, evSales: 220, population: 28000, competition: 'Low' },
    { area: 'Business Hub', score: 76, evSales: 190, population: 22000, competition: 'High' }
  ],

  maintenanceData: [
    { station: 'Station Alpha', lastMaintenance: '2024-06-15', nextDue: '2024-09-15', status: 'Good', alerts: 0 },
    { station: 'Station Beta', lastMaintenance: '2024-05-20', nextDue: '2024-08-20', status: 'Warning', alerts: 2 },
    { station: 'Station Gamma', lastMaintenance: '2024-07-01', nextDue: '2024-10-01', status: 'Excellent', alerts: 0 }
  ],

  aiSuggestions: [
    "Consider installing fast chargers in Tech Park District due to high EV adoption",
    "Morning rush hours show 40% higher usage - adjust pricing accordingly",
    "Weather data suggests covered charging stations perform 25% better"
  ],

  maintenanceAlerts: [
    { type: 'warning', message: 'Station Beta requires inspection in 10 days', priority: 'medium' },
    { type: 'info', message: 'New software update available for all stations', priority: 'low' }
  ]
};

// Export utility function
export const exportData = (format) => {
  const data = {
    locations: mockDataService.locationSuggestions,
    profitAnalysis: mockDataService.profitData,
    maintenance: mockDataService.maintenanceData
  };
  
  if (format === 'csv') {
    const csvContent = Object.entries(data).map(([key, value]) => 
      `${key}\n${JSON.stringify(value)}`
    ).join('\n\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ev-charging-analysis.csv';
    link.click();
  }
};