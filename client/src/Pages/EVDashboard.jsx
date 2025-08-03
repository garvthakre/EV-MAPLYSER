import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  TrendingUp, 
  Settings, 
  DollarSign, 
  Download, 
  Search,
  BarChart3,
  Zap,
  AlertCircle,
  CheckCircle,
  User,
  MessageSquare,
  Calendar,
  Target,
  Activity,
  PieChart,
  Map
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const EVChargingDashboard = () => {
  const [activeTab, setActiveTab] = useState('analysis');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [userRole, setUserRole] = useState('analyst');
  const [suggestions, setSuggestions] = useState([]);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState([]);

  // Mock data for demonstration
  const evSalesData = [
    { month: 'Jan', sales: 120, stations: 5 },
    { month: 'Feb', sales: 135, stations: 6 },
    { month: 'Mar', sales: 180, stations: 8 },
    { month: 'Apr', sales: 220, stations: 10 },
    { month: 'May', sales: 290, stations: 12 },
    { month: 'Jun', sales: 340, stations: 15 }
  ];

  const profitData = [
    { year: '2023', revenue: 50000, costs: 35000, profit: 15000 },
    { year: '2024', revenue: 75000, costs: 45000, profit: 30000 },
    { year: '2025', revenue: 120000, costs: 65000, profit: 55000 }
  ];

  const locationSuggestions = [
    { area: 'Tech Park District', score: 95, evSales: 340, population: 45000, competition: 'Low' },
    { area: 'Shopping Mall Complex', score: 88, evSales: 280, population: 35000, competition: 'Medium' },
    { area: 'Residential Zone A', score: 82, evSales: 220, population: 28000, competition: 'Low' },
    { area: 'Business Hub', score: 76, evSales: 190, population: 22000, competition: 'High' }
  ];

  const maintenanceData = [
    { station: 'Station Alpha', lastMaintenance: '2024-06-15', nextDue: '2024-09-15', status: 'Good', alerts: 0 },
    { station: 'Station Beta', lastMaintenance: '2024-05-20', nextDue: '2024-08-20', status: 'Warning', alerts: 2 },
    { station: 'Station Gamma', lastMaintenance: '2024-07-01', nextDue: '2024-10-01', status: 'Excellent', alerts: 0 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  useEffect(() => {
    // Simulate AI suggestions
    const mockSuggestions = [
      "Consider installing fast chargers in Tech Park District due to high EV adoption",
      "Morning rush hours show 40% higher usage - adjust pricing accordingly",
      "Weather data suggests covered charging stations perform 25% better"
    ];
    setSuggestions(mockSuggestions);

    // Mock maintenance alerts
    const mockAlerts = [
      { type: 'warning', message: 'Station Beta requires inspection in 10 days', priority: 'medium' },
      { type: 'info', message: 'New software update available for all stations', priority: 'low' }
    ];
    setMaintenanceAlerts(mockAlerts);
  }, []);

  const exportData = (format) => {
    const data = {
      locations: locationSuggestions,
      profitAnalysis: profitData,
      maintenance: maintenanceData
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

  const LocationAnalysisTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <MapPin className="mr-2 text-blue-600" />
          Location Analysis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select City/Locality
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                placeholder="Enter location (e.g., Mumbai, Bangalore)"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Analysis Radius
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>5 km</option>
              <option>10 km</option>
              <option>15 km</option>
              <option>20 km</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">EV Sales Trend</h4>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={evSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="sales" stackId="1" stroke="#0088FE" fill="#0088FE" fillOpacity={0.3} />
              <Area type="monotone" dataKey="stations" stackId="2" stroke="#00C49F" fill="#00C49F" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Target className="mr-2 text-green-600" />
          Recommended Locations
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {locationSuggestions.map((location, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-semibold text-gray-800">{location.area}</h5>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  location.score >= 90 ? 'bg-green-100 text-green-800' :
                  location.score >= 80 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  Score: {location.score}
                </span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>EV Sales: {location.evSales}/month</p>
                <p>Population: {location.population.toLocaleString()}</p>
                <p>Competition: {location.competition}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProfitAnalysisTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <DollarSign className="mr-2 text-green-600" />
          Profit Margin Evaluator
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Revenue</p>
                <p className="text-2xl font-bold">₹1.2M</p>
              </div>
              <TrendingUp size={32} />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Net Profit</p>
                <p className="text-2xl font-bold">₹550K</p>
              </div>
              <BarChart3 size={32} />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">ROI</p>
                <p className="text-2xl font-bold">45.8%</p>
              </div>
              <PieChart size={32} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Profit Projection</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={profitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#0088FE" />
                <Bar dataKey="costs" fill="#FF8042" />
                <Bar dataKey="profit" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Cost Breakdown</h4>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={[
                    { name: 'Equipment', value: 40 },
                    { name: 'Installation', value: 25 },
                    { name: 'Maintenance', value: 20 },
                    { name: 'Operations', value: 15 }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const MaintenanceTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Settings className="mr-2 text-orange-600" />
          Maintenance Assurance
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {maintenanceData.map((station, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-semibold text-gray-800">{station.station}</h5>
                <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  station.status === 'Excellent' ? 'bg-green-100 text-green-800' :
                  station.status === 'Good' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {station.status === 'Excellent' ? <CheckCircle size={12} /> : 
                   station.status === 'Good' ? <CheckCircle size={12} /> : 
                   <AlertCircle size={12} />}
                  <span>{station.status}</span>
                </span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Last Maintenance: {station.lastMaintenance}</p>
                <p>Next Due: {station.nextDue}</p>
                <p>Alerts: {station.alerts}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <AlertCircle className="mr-2 text-yellow-600" />
            Maintenance Alerts
          </h4>
          <div className="space-y-2">
            {maintenanceAlerts.map((alert, index) => (
              <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg ${
                alert.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
              }`}>
                <AlertCircle size={16} className={alert.type === 'warning' ? 'text-yellow-600 mt-1' : 'text-blue-600 mt-1'} />
                <p className="text-sm text-gray-700">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const DashboardTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100">Active Stations</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <Zap size={32} />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100">Monthly Usage</p>
              <p className="text-2xl font-bold">1,340</p>
            </div>
            <Activity size={32} />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100">Coverage Areas</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <Map size={32} />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100">Avg. Utilization</p>
              <p className="text-2xl font-bold">78%</p>
            </div>
            <BarChart3 size={32} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Usage Analytics</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={evSalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#0088FE" strokeWidth={2} />
            <Line type="monotone" dataKey="stations" stroke="#00C49F" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
                onClick={() => exportData('csv')}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Navigation Tabs */}
            <div className="flex space-x-2 mb-6">
              <TabButton 
                id="dashboard" 
                icon={BarChart3} 
                label="Dashboard" 
                isActive={activeTab === 'dashboard'} 
                onClick={setActiveTab} 
              />
              <TabButton 
                id="analysis" 
                icon={MapPin} 
                label="Location Analysis" 
                isActive={activeTab === 'analysis'} 
                onClick={setActiveTab} 
              />
              <TabButton 
                id="profit" 
                icon={DollarSign} 
                label="Profit Analysis" 
                isActive={activeTab === 'profit'} 
                onClick={setActiveTab} 
              />
              <TabButton 
                id="maintenance" 
                icon={Settings} 
                label="Maintenance" 
                isActive={activeTab === 'maintenance'} 
                onClick={setActiveTab} 
              />
            </div>

            {/* Tab Content */}
            {activeTab === 'dashboard' && <DashboardTab />}
            {activeTab === 'analysis' && <LocationAnalysisTab />}
            {activeTab === 'profit' && <ProfitAnalysisTab />}
            {activeTab === 'maintenance' && <MaintenanceTab />}
          </div>

          {/* AI Suggestions Panel */}
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
        </div>
      </div>
    </div>
  );
};

export default EVChargingDashboard;