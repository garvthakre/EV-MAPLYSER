// components/LocationAnalysisTab.jsx
import React, { useState, useEffect } from 'react';
import { MapPin, Search, Target, TrendingUp, Users, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Import the dummy data
const chhattisgarhLocationSuggestions = [
  {
    area: "Raipur Central - GE Road",
    score: 94,
    evSales: 245,
    population: 1250000,
    competition: "Low (2 stations)"
  },
  {
    area: "Bilaspur - Ring Road",
    score: 89,
    evSales: 178,
    population: 650000,
    competition: "Medium (4 stations)"
  },
  {
    area: "Durg - Steel Plant Area",
    score: 91,
    evSales: 198,
    population: 420000,
    competition: "Low (1 station)"
  },
  {
    area: "Korba - Power Plant Zone",
    score: 87,
    evSales: 156,
    population: 365000,
    competition: "Low (2 stations)"
  },
  {
    area: "Rajnandgaon - Highway Junction",
    score: 85,
    evSales: 134,
    population: 195000,
    competition: "Very Low (0 stations)"
  },
  {
    area: "Jagdalpur - Collectorate Area",
    score: 82,
    evSales: 98,
    population: 155000,
    competition: "Very Low (0 stations)"
  },
  {
    area: "Raigarh - Industrial Area",
    score: 88,
    evSales: 167,
    population: 145000,
    competition: "Low (1 station)"
  },
  {
    area: "Ambikapur - Bus Stand Area",
    score: 79,
    evSales: 89,
    population: 125000,
    competition: "Very Low (0 stations)"
  }
];

const chhattisgarhEvSalesData = [
  { month: "Jan 2024", sales: 1240, stations: 15 },
  { month: "Feb 2024", sales: 1380, stations: 17 },
  { month: "Mar 2024", sales: 1520, stations: 19 },
  { month: "Apr 2024", sales: 1680, stations: 22 },
  { month: "May 2024", sales: 1850, stations: 25 },
  { month: "Jun 2024", sales: 2120, stations: 28 },
  { month: "Jul 2024", sales: 2350, stations: 31 },
  { month: "Aug 2024", sales: 2580, stations: 34 },
  { month: "Sep 2024", sales: 2780, stations: 37 },
  { month: "Oct 2024", sales: 3020, stations: 41 },
  { month: "Nov 2024", sales: 3280, stations: 44 },
  { month: "Dec 2024", sales: 3540, stations: 47 }
];

const chhattisgarhCities = [
  "Raipur", "Bilaspur", "Durg", "Korba", "Rajnandgaon", 
  "Jagdalpur", "Raigarh", "Ambikapur", "Mahasamund", "Kanker",
  "Jashpur", "Surguja", "Kawardha", "Dhamtari", "Kondagaon"
];

const LocationCard = ({ location, index }) => (
  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:border-blue-300">
    <div className="flex justify-between items-start mb-3">
      <h5 className="font-semibold text-gray-800">{location.area}</h5>
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        location.score >= 90 ? 'bg-green-100 text-green-800' :
        location.score >= 80 ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        Score: {location.score}
      </span>
    </div>
    <div className="space-y-2">
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Zap size={14} className="text-blue-500" />
        <span>EV Sales: <strong>{location.evSales}/month</strong></span>
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Users size={14} className="text-green-500" />
        <span>Population: <strong>{location.population.toLocaleString()}</strong></span>
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Target size={14} className="text-orange-500" />
        <span>Competition: <strong>{location.competition}</strong></span>
      </div>
    </div>
    <div className="mt-3 pt-3 border-t border-gray-100">
      <button className="w-full py-2 px-3 bg-blue-50 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors">
        View Detailed Analysis
      </button>
    </div>
  </div>
);

const StatsCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className={`text-xs ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? '+' : ''}{change}% from last month
        </p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </div>
);

const LocationAnalysisTab = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [analysisRadius, setAnalysisRadius] = useState('10 km');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedLocation) {
      const filtered = chhattisgarhCities.filter(city => 
        city.toLowerCase().includes(selectedLocation.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [selectedLocation]);

  const handleLocationSelect = (city) => {
    setSelectedLocation(city);
    setShowSuggestions(false);
    setLoading(true);
    // Simulate API call
    setTimeout(() => setLoading(false), 1500);
  };

  const statsData = [
    { title: "Total EV Sales", value: "3.5K", change: 12.3, icon: TrendingUp, color: "bg-blue-500" },
    { title: "Active Stations", value: "47", change: 8.5, icon: Zap, color: "bg-green-500" },
    { title: "Avg. Daily Users", value: "280", change: 15.2, icon: Users, color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <MapPin className="mr-2 text-blue-600" />
          Location Analysis - Chhattisgarh
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select City/Locality
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                placeholder="Enter Chhattisgarh location (e.g., Raipur, Bilaspur)"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {showSuggestions && filteredCities.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {filteredCities.slice(0, 5).map((city, index) => (
                    <button
                      key={index}
                      onClick={() => handleLocationSelect(city)}
                      className="w-full px-4 py-2 text-left hover:bg-blue-50 focus:bg-blue-50"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Analysis Radius
            </label>
            <select 
              value={analysisRadius}
              onChange={(e) => setAnalysisRadius(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option>5 km</option>
              <option>10 km</option>
              <option>15 km</option>
              <option>20 km</option>
              <option>25 km</option>
            </select>
          </div>
        </div>

        {selectedLocation && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">
              Analysis for {selectedLocation} (Radius: {analysisRadius})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-600 font-medium">Government Support:</span>
                <p className="text-gray-700">High - State EV policy incentives available</p>
              </div>
              <div>
                <span className="text-blue-600 font-medium">Infrastructure:</span>
                <p className="text-gray-700">Good - Highway connectivity, power grid stable</p>
              </div>
              <div>
                <span className="text-blue-600 font-medium">Market Potential:</span>
                <p className="text-gray-700">Growing - 15% YoY EV adoption increase</p>
              </div>
            </div>
          </div>
        )}

        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">EV Sales & Station Growth Trend</h4>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={chhattisgarhEvSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}
              />
              <Legend />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="sales" 
                stackId="1" 
                stroke="#0088FE" 
                fill="#0088FE" 
                fillOpacity={0.3}
                name="EV Sales"
              />
              <Area 
                yAxisId="right"
                type="monotone" 
                dataKey="stations" 
                stackId="2" 
                stroke="#00C49F" 
                fill="#00C49F" 
                fillOpacity={0.3}
                name="Charging Stations"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center">
            <Target className="mr-2 text-green-600" />
            Top Recommended Locations in Chhattisgarh
          </h4>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-3 h-3 bg-green-100 rounded-full"></div>
            <span>Score ≥90: Excellent</span>
            <div className="w-3 h-3 bg-yellow-100 rounded-full ml-4"></div>
            <span>Score ≥80: Good</span>
            <div className="w-3 h-3 bg-red-100 rounded-full ml-4"></div>
            <span>Score 80: Fair</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chhattisgarhLocationSuggestions.map((location, index) => (
            <LocationCard key={index} location={location} index={index} />
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h5 className="font-semibold text-gray-800 mb-2">Market Insights for Chhattisgarh</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <strong>Peak Season:</strong> October to March (favorable weather)
            </div>
            <div>
              <strong>Key Demographics:</strong> Government employees, industrial workers
            </div>
            <div>
              <strong>Growth Rate:</strong> 12.3% month-over-month
            </div>
            <div>
              <strong>Avg. Session Time:</strong> 45 minutes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationAnalysisTab;