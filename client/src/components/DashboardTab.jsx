// components/DashboardTab.jsx
import React from 'react';
import { Zap, Activity, Map, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StatCard = ({ title, value, color, icon: Icon }) => (
  <div className={`bg-gradient-to-r ${color} rounded-lg p-4 text-white`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-opacity-80">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <Icon size={32} />
    </div>
  </div>
);

const DashboardTab = ({ evSalesData }) => {
  const stats = [
    { title: 'Active Stations', value: '24', color: 'from-indigo-500 to-indigo-600', icon: Zap },
    { title: 'Monthly Usage', value: '1,340', color: 'from-teal-500 to-teal-600', icon: Activity },
    { title: 'Coverage Areas', value: '12', color: 'from-pink-500 to-pink-600', icon: Map },
    { title: 'Avg. Utilization', value: '78%', color: 'from-amber-500 to-amber-600', icon: BarChart3 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
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
};

export default DashboardTab;