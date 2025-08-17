import React, { useState, useEffect } from 'react';
import { Zap, Activity, Map, BarChart3, RefreshCw, TrendingUp, MapPin, Users, Battery, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Dummy data for Chhattisgarh EV charging network
const DUMMY_DATA = {
  stats: {
    activeStations: 847,
    monthlyUsage: 34567,
    coverageAreas: 28, // 28 districts in Chhattisgarh
    avgUtilization: 78
  },
  
  chartData: [
    { month: 'Jan 2024', sales: 2890, stations: 45, revenue: 287500 },
    { month: 'Feb 2024', sales: 3245, stations: 52, revenue: 324800 },
    { month: 'Mar 2024', sales: 4123, stations: 67, revenue: 412750 },
    { month: 'Apr 2024', sales: 3876, stations: 73, revenue: 387600 },
    { month: 'May 2024', sales: 4567, stations: 89, revenue: 456900 },
    { month: 'Jun 2024', sales: 5234, stations: 98, revenue: 523400 },
    { month: 'Jul 2024', sales: 4891, stations: 112, revenue: 489100 },
    { month: 'Aug 2024', sales: 5678, stations: 134, revenue: 567800 },
    { month: 'Sep 2024', sales: 6234, stations: 156, revenue: 623400 },
    { month: 'Oct 2024', sales: 5987, stations: 167, revenue: 598700 },
    { month: 'Nov 2024', sales: 7123, stations: 189, revenue: 712300 },
    { month: 'Dec 2024', sales: 8456, stations: 203, revenue: 845600 }
  ],

  stationPerformance: [
    {
      stationId: 'CG001',
      stationName: 'Raipur Central Mall',
      location: 'Telibandha, Raipur',
      totalSessions: 3456,
      totalRevenue: 456789,
      totalKwh: 23456.7,
      utilization: 89,
      district: 'Raipur'
    },
    {
      stationId: 'CG002', 
      stationName: 'Bilaspur Railway Station',
      location: 'Railway Station Road, Bilaspur',
      totalSessions: 2987,
      totalRevenue: 398900,
      totalKwh: 19876.3,
      utilization: 84,
      district: 'Bilaspur'
    },
    {
      stationId: 'CG003',
      stationName: 'Korba Power Plant Hub',
      location: 'NTPC Township, Korba',
      totalSessions: 2654,
      totalRevenue: 345670,
      totalKwh: 18234.5,
      utilization: 76,
      district: 'Korba'
    },
    {
      stationId: 'CG004',
      stationName: 'Durg Steel City Plaza',
      location: 'Steel Plant Road, Durg',
      totalSessions: 2341,
      totalRevenue: 312450,
      totalKwh: 16789.2,
      utilization: 82,
      district: 'Durg'
    },
    {
      stationId: 'CG005',
      stationName: 'Rajnandgaon Market Square',
      location: 'Main Market, Rajnandgaon',
      totalSessions: 2198,
      totalRevenue: 289740,
      totalKwh: 15234.8,
      utilization: 71,
      district: 'Rajnandgaon'
    },
    {
      stationId: 'CG006',
      stationName: 'Jagdalpur Tribal Museum',
      location: 'Museum Road, Jagdalpur',
      totalSessions: 1876,
      totalRevenue: 243880,
      totalKwh: 12456.3,
      utilization: 68,
      district: 'Bastar'
    },
    {
      stationId: 'CG007',
      stationName: 'Ambikapur Forest Gateway',
      location: 'NH-43, Ambikapur',
      totalSessions: 1654,
      totalRevenue: 215020,
      totalKwh: 11234.7,
      utilization: 63,
      district: 'Surguja'
    },
    {
      stationId: 'CG008',
      stationName: 'Raigarh Industrial Hub',
      location: 'Industrial Area, Raigarh',
      totalSessions: 1543,
      totalRevenue: 200590,
      totalKwh: 10456.9,
      utilization: 59,
      district: 'Raigarh'
    }
  ],

  recentActivity: [
    { time: '2 minutes ago', event: 'New session started at Raipur Central Mall', type: 'session' },
    { time: '5 minutes ago', event: 'Station CG045 came online in Dhamtari', type: 'station' },
    { time: '12 minutes ago', event: 'Maintenance completed at Bilaspur Railway Station', type: 'maintenance' },
    { time: '18 minutes ago', event: 'Peak usage alert: Korba Power Plant Hub at 95%', type: 'alert' },
    { time: '25 minutes ago', event: 'New user registration from Mahasamund', type: 'user' }
  ],

  districtStats: [
    { district: 'Raipur', stations: 156, usage: 8934, revenue: 1234567 },
    { district: 'Bilaspur', stations: 89, usage: 5678, revenue: 856432 },
    { district: 'Korba', stations: 76, usage: 4532, revenue: 678945 },
    { district: 'Durg', stations: 67, usage: 4123, revenue: 589234 },
    { district: 'Rajnandgaon', stations: 54, usage: 3456, revenue: 445678 },
    { district: 'Bastar', stations: 43, usage: 2876, revenue: 387456 },
    { district: 'Surguja', stations: 38, usage: 2345, revenue: 312456 }
  ]
};

// Mock API service to simulate backend calls
const MockApiService = {
  getDashboardStats: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(DUMMY_DATA.stats);
      }, 800 + Math.random() * 400); // 0.8-1.2 second delay
    });
  },

  getUsageAnalytics: (period) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = DUMMY_DATA.chartData.slice(-period);
        resolve(data);
      }, 600 + Math.random() * 400);
    });
  },

  getStationPerformance: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(DUMMY_DATA.stationPerformance);
      }, 500 + Math.random() * 300);
    });
  }
};

const StatCard = ({ title, value, color, icon: Icon, isLoading, trend, subtitle }) => (
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
        {subtitle && (
          <p className="text-xs text-white text-opacity-70">{subtitle}</p>
        )}
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
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, analyticsResponse] = await Promise.all([
        MockApiService.getDashboardStats(),
        MockApiService.getUsageAnalytics(chartPeriod)
      ]);

      setDashboardData({
        stats: statsResponse,
        chartData: analyticsResponse,
        stationPerformance: dashboardData.stationPerformance
      });
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
      setDashboardData({
        stats: { activeStations: 0, monthlyUsage: 0, coverageAreas: 0, avgUtilization: 0 },
        chartData: [],
        stationPerformance: []
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStationPerformance = async () => {
    try {
      const performanceData = await MockApiService.getStationPerformance();
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
      trend: 8.5,
      subtitle: 'Across 28 districts'
    },
    { 
      title: 'Monthly Sessions', 
      value: loading ? '...' : dashboardData.stats.monthlyUsage.toLocaleString(), 
      color: 'from-teal-500 to-teal-600', 
      icon: Activity,
      trend: 15.3,
      subtitle: 'EV charging sessions'
    },
    { 
      title: 'Districts Covered', 
      value: loading ? '...' : dashboardData.stats.coverageAreas.toString(), 
      color: 'from-pink-500 to-pink-600', 
      icon: Map,
      trend: 12.1,
      subtitle: 'Out of 28 in Chhattisgarh'
    },
    { 
      title: 'Avg. Utilization', 
      value: loading ? '...' : `${dashboardData.stats.avgUtilization}%`, 
      color: 'from-amber-500 to-amber-600', 
      icon: BarChart3,
      trend: 5.7,
      subtitle: 'Network efficiency'
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{`Month: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey === 'sales' ? 'Sessions' : 
                 entry.dataKey === 'revenue' ? 'Revenue (₹)' : 'Stations'}: ${
                entry.dataKey === 'revenue' ? `₹${entry.value.toLocaleString()}` : entry.value
              }`}
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
          <h1 className="text-3xl font-bold text-gray-800">Chhattisgarh EV Network</h1>
          <p className="text-gray-600">
            Real-time monitoring of charging infrastructure across Chhattisgarh
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex space-x-3">
          <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium">System Online</span>
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

      {/* Additional Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center">
            <Users className="text-blue-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-xl font-bold">12,456</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center">
            <Battery className="text-green-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-600">Total Energy</p>
              <p className="text-xl font-bold">234.5 MWh</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center">
            <MapPin className="text-red-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-600">Cities</p>
              <p className="text-xl font-bold">156</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center">
            <Clock className="text-purple-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-600">Avg Session</p>
              <p className="text-xl font-bold">45 min</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Analytics Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Network Growth Analytics</h3>
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
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {dashboardData.stationPerformance.slice(0, 8).map((station, index) => (
                <div key={station.stationId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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
                      <p className="text-xs text-gray-600">{station.location}</p>
                      <p className="text-xs text-blue-600">{station.totalSessions} sessions • {station.utilization}% util.</p>
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
              <p>Loading performance data...</p>
            </div>
          )}
        </div>
      </div>

      {/* District Performance and Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Monthly Revenue Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" fill="#8884d8" name="Revenue (₹)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* District Performance */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Top Districts by Usage</h3>
          <div className="space-y-3">
            {DUMMY_DATA.districtStats.slice(0, 7).map((district, index) => (
              <div key={district.district} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{district.district}</p>
                    <p className="text-sm text-gray-600">{district.stations} stations</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{district.usage.toLocaleString()} sessions</p>
                  <p className="text-xs text-green-600">₹{district.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Network Activity</h3>
        <div className="space-y-3">
          {DUMMY_DATA.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'session' ? 'bg-green-500' :
                activity.type === 'station' ? 'bg-blue-500' :
                activity.type === 'maintenance' ? 'bg-yellow-500' :
                activity.type === 'alert' ? 'bg-red-500' : 'bg-purple-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">{activity.event}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;