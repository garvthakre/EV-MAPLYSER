// components/ProfitAnalysisTab.jsx
import React from 'react';
import { DollarSign, TrendingUp, BarChart3, PieChart } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell 
} from 'recharts';

const MetricCard = ({ title, value, color, icon: Icon }) => (
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

const ProfitAnalysisTab = ({ profitData }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const costBreakdownData = [
    { name: 'Equipment', value: 40 },
    { name: 'Installation', value: 25 },
    { name: 'Maintenance', value: 20 },
    { name: 'Operations', value: 15 }
  ];

  const metrics = [
    { title: 'Total Revenue', value: '₹1.2M', color: 'from-blue-500 to-blue-600', icon: TrendingUp },
    { title: 'Net Profit', value: '₹550K', color: 'from-green-500 to-green-600', icon: BarChart3 },
    { title: 'ROI', value: '45.8%', color: 'from-purple-500 to-purple-600', icon: PieChart }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <DollarSign className="mr-2 text-green-600" />
          Profit Margin Evaluator
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
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
                  data={costBreakdownData}
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
};

export default ProfitAnalysisTab;