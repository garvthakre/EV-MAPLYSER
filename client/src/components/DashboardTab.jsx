// components/DashboardTab.jsx
import React, { useState, useEffect } from 'react';
import { Zap, Activity, Map, BarChart3, RefreshCw, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import ApiService from '../services/api';

const StatCard = ({ title, value, color, icon: Icon, isLoading, trend }) => (
  <div className={`bg-gradient-to-r ${color} rounded-lg p-4 text-white relative overflow-hidden`}>
    {isLoading && (
      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
        <RefreshCw className="animate-spin" size={20} />
      </div>
    )}
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white text-opacity-80 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        {trend && (
          <div className="flex items-center mt-1">
            <TrendingUp size={14} className="mr-1" />
            <span className="text-xs text-white text-opacity-90">+{trend}% this month</span>
          </div>
        )}
      </div>
      <Icon size={32} className="text-white text-opacity-80" />
    </div>
  </div>
);

const DashboardTab = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      activeStations: 0,
      monthlyUsage: 0,
      coverageAreas: 0,
      avgUtilization: 0
    },
    chartData: [],
    stationPerformance: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartPeriod, setChartPeriod] = useState(12);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, analyticsResponse] = await Promise.all([
        ApiService.getDashboardStats(),
        ApiService.getUsageAnalytics(chartPeriod)
      ]);

      setDashboardData({
        stats: statsResponse,
        chartData: analyticsResponse,
        stationPerformance: dashboardData.stationPerformance // Keep existing performance data
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
      // Set fallback data
      setDashboardData({
        stats: {
          activeStations: 0,
          monthlyUsage: 0,
          coverageAreas: 0,
          avgUtilization: 0
        },
        chartData: [],
        stationPerformance: []
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch station performance data
  const fetchStationPerformance = async () => {
    try {
      const performanceData = await ApiService.getStationPerformance();
      setDashboardData(prev => ({
        ...prev,
        stationPerformance: performanceData
      }));
    } catch (err) {
      console.error('Error fetching station performance:', err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [chartPeriod]);

  useEffect(() => {
    fetchStationPerformance();
  }, []);

  // Auto-refresh data every 5 minutes
  useEffect(() => {
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [chartPeriod]);

  const stats = [
    { 
      title: 'Active Stations', 
      value: loading ? '...' : dashboardData.stats.activeStations.toString(), 
      color: 'from-indigo-500 to-indigo-600', 
      icon: Zap,
      trend: 5
    },
    { 
      title: 'Monthly Usage', 
      value: loading ? '...' : dashboardData.stats.monthlyUsage.toLocaleString(), 
      color: 'from-teal-500 to-teal-600', 
      icon: Activity,
      trend: 12
    },
    { 
      title: 'Coverage Areas', 
      value: loading ? '...' : dashboardData.stats.coverageAreas.toString(), 
      color: 'from-pink-500 to-pink-600', 
      icon: Map,
      trend: 8
    },
    { 
      title: 'Avg. Utilization', 
      value: loading ? '...' : `${dashboardData.stats.avgUtilization}%`, 
      color: 'from-amber-500 to-amber-600', 
      icon: BarChart3,
      trend: 3
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{`Month: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey === 'sales' ? 'Sessions' : 'Stations'}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">EV Charging Dashboard</h1>
          <p className="text-gray-600">Monitor your charging network performance</p>
        </div>
        <button
          onClick={fetchDashboardData}
          disabled={loading}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          <RefreshCw className={loading ? 'animate-spin' : ''} size={16} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} isLoading={loading} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Analytics Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Usage Analytics</h3>
            <select
              value={chartPeriod}
              onChange={(e) => setChartPeriod(Number(e.target.value))}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value={3}>3 Months</option>
              <option value={6}>6 Months</option>
              <option value={12}>12 Months</option>
            </select>
          </div>
          
          {loading ? (
            <div className="h-80 flex items-center justify-center">
              <RefreshCw className="animate-spin" size={32} />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#0088FE" 
                  strokeWidth={2}
                  name="Sessions"
                  dot={{ fill: '#0088FE', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="stations" 
                  stroke="#00C49F" 
                  strokeWidth={2}
                  name="Active Stations"
                  dot={{ fill: '#00C49F', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Top Performing Stations */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Top Performing Stations</h3>
          {dashboardData.stationPerformance.length > 0 ? (
            <div className="space-y-3">
              {dashboardData.stationPerformance.slice(0, 5).map((station, index) => (
                <div key={station.stationId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{station.stationName}</p>
                      <p className="text-sm text-gray-600">{station.totalSessions} sessions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">₹{station.totalRevenue?.toLocaleString() || 0}</p>
                    <p className="text-xs text-gray-500">{station.totalKwh?.toFixed(1) || 0} kWh</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <BarChart3 size={48} className="mx-auto mb-2 opacity-50" />
              <p>No performance data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Monthly Revenue Breakdown</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dashboardData.chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#8884d8" name="Revenue (₹)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardTab;