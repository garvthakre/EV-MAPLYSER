// components/LocationAnalysisTab.jsx
import React from 'react';
import { MapPin, Search, Target } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LocationCard = ({ location, index }) => (
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
);

const LocationAnalysisTab = ({ 
  selectedLocation, 
  setSelectedLocation, 
  evSalesData, 
  locationSuggestions 
}) => {
  return (
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
            <LocationCard key={index} location={location} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationAnalysisTab;