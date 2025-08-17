// components/ProfitAnalysisTab.jsx
import React, { useState } from 'react';
import { DollarSign, TrendingUp, BarChart3, PieChart, Target, Calculator, MapPin } from 'lucide-react';
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
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';

// Comprehensive Chhattisgarh profit data
const chhattisgarhProfitData = [
  {
    year: "2024",
    revenue: 1200000,
    costs: 680000,
    profit: 520000,
    stations: 47,
    users: 8420
  },
  {
    year: "2025",
    revenue: 1850000,
    costs: 920000,
    profit: 930000,
    stations: 72,
    users: 14500
  },
  {
    year: "2026",
    revenue: 2650000,
    costs: 1180000,
    profit: 1470000,
    stations: 105,
    users: 23800
  },
  {
    year: "2027",
    revenue: 3420000,
    costs: 1450000,
    profit: 1970000,
    stations: 145,
    users: 36200
  },
  {
    year: "2028",
    revenue: 4380000,
    costs: 1760000,
    profit: 2620000,
    stations: 190,
    users: 52100
  }
];

const monthlyRevenueData = [
  { month: "Jan", revenue: 95000, expenses: 52000, profit: 43000 },
  { month: "Feb", revenue: 108000, expenses: 56000, profit: 52000 },
  { month: "Mar", revenue: 124000, expenses: 61000, profit: 63000 },
  { month: "Apr", revenue: 142000, expenses: 68000, profit: 74000 },
  { month: "May", revenue: 158000, expenses: 74000, profit: 84000 },
  { month: "Jun", revenue: 176000, expenses: 82000, profit: 94000 },
  { month: "Jul", revenue: 195000, expenses: 89000, profit: 106000 },
  { month: "Aug", revenue: 218000, expenses: 98000, profit: 120000 },
  { month: "Sep", revenue: 235000, expenses: 105000, profit: 130000 },
  { month: "Oct", revenue: 256000, expenses: 115000, profit: 141000 },
  { month: "Nov", revenue: 278000, expenses: 125000, profit: 153000 },
  { month: "Dec", revenue: 295000, expenses: 132000, profit: 163000 }
];

const costBreakdownData = [
  { name: 'Equipment & Hardware', value: 35, amount: 420000 },
  { name: 'Installation & Setup', value: 22, amount: 264000 },
  { name: 'Maintenance & Support', value: 18, amount: 216000 },
  { name: 'Operations & Staff', value: 15, amount: 180000 },
  { name: 'Electricity & Utilities', value: 10, amount: 120000 }
];

const locationWiseProfitData = [
  { location: "Raipur", revenue: 485000, profit: 218250, margin: "45%" },
  { location: "Bilaspur", revenue: 312000, profit: 140400, margin: "45%" },
  { location: "Durg", revenue: 268000, profit: 120600, margin: "45%" },
  { location: "Korba", revenue: 195000, profit: 87750, margin: "45%" },
  { location: "Rajnandgaon", revenue: 156000, profit: 70200, margin: "45%" },
  { location: "Others", revenue: 284000, profit: 127800, margin: "45%" }
];

const competitionAnalysis = [
  { competitor: "Our Network", marketShare: 28, revenue: 1200000, color: "#0088FE" },
  { competitor: "Tata Power", marketShare: 35, revenue: 1500000, color: "#00C49F" },
  { competitor: "BPCL", marketShare: 18, revenue: 771000, color: "#FFBB28" },
  { competitor: "Others", marketShare: 19, revenue: 814000, color: "#FF8042" }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const MetricCard = ({ title, value, change, color, icon: Icon, subtitle }) => (
  <div className={`bg-gradient-to-r ${color} rounded-lg p-4 text-white`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white text-opacity-80 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        {subtitle && <p className="text-xs text-white text-opacity-70 mt-1">{subtitle}</p>}
        {change && (
          <p className="text-xs text-white text-opacity-90 mt-1">
            {change >= 0 ? '+' : ''}{change}% from last month
          </p>
        )}
      </div>
      <Icon size={32} className="text-white text-opacity-80" />
    </div>
  </div>
);

const LocationCard = ({ location, revenue, profit, margin }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
    <div className="flex items-center mb-3">
      <MapPin size={16} className="text-blue-500 mr-2" />
      <h4 className="font-semibold text-gray-800">{location}</h4>
    </div>
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Revenue:</span>
        <span className="font-medium text-gray-800">₹{(revenue/1000).toFixed(0)}K</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Profit:</span>
        <span className="font-medium text-green-600">₹{(profit/1000).toFixed(0)}K</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Margin:</span>
        <span className="font-medium text-blue-600">{margin}</span>
      </div>
    </div>
  </div>
);

const ProfitAnalysisTab = () => {
  const [selectedView, setSelectedView] = useState('yearly');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const currentYear = chhattisgarhProfitData[0];
  const totalRevenue = currentYear.revenue;
  const totalProfit = currentYear.profit;
  const profitMargin = ((totalProfit / totalRevenue) * 100).toFixed(1);
  const roi = ((totalProfit / currentYear.costs) * 100).toFixed(1);

  const metrics = [
    { 
      title: 'Total Revenue', 
      value: `₹${(totalRevenue/100000).toFixed(1)}L`, 
      change: 12.3, 
      color: 'from-blue-500 to-blue-600', 
      icon: TrendingUp,
      subtitle: 'Annual 2024'
    },
    { 
      title: 'Net Profit', 
      value: `₹${(totalProfit/100000).toFixed(1)}L`, 
      change: 18.7, 
      color: 'from-green-500 to-green-600', 
      icon: BarChart3,
      subtitle: `${profitMargin}% margin`
    },
    { 
      title: 'ROI', 
      value: `${roi}%`, 
      change: 5.2, 
      color: 'from-purple-500 to-purple-600', 
      icon: Target,
      subtitle: 'Return on Investment'
    },
    { 
      title: 'Break-even', 
      value: '14 months', 
      change: -2, 
      color: 'from-orange-500 to-orange-600', 
      icon: Calculator,
      subtitle: 'Expected timeline'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <DollarSign className="mr-2 text-green-600" />
            Profit Analysis - Chhattisgarh Operations
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedView('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedView === 'yearly' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Yearly View
            </button>
            <button
              onClick={() => setSelectedView('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedView === 'monthly' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Monthly View
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              {selectedView === 'yearly' ? '5-Year Profit Projection' : '2024 Monthly Performance'}
            </h4>
            <ResponsiveContainer width="100%" height={350}>
              {selectedView === 'yearly' ? (
                <BarChart data={chhattisgarhProfitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`₹${(value/100000).toFixed(1)}L`, '']}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#0088FE" name="Revenue" />
                  <Bar dataKey="costs" fill="#FF8042" name="Costs" />
                  <Bar dataKey="profit" fill="#00C49F" name="Profit" />
                </BarChart>
              ) : (
                <AreaChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`₹${(value/1000).toFixed(0)}K`, '']}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" stackId="1" stroke="#0088FE" fill="#0088FE" fillOpacity={0.3} name="Revenue" />
                  <Area type="monotone" dataKey="expenses" stackId="2" stroke="#FF8042" fill="#FF8042" fillOpacity={0.3} name="Expenses" />
                  <Area type="monotone" dataKey="profit" stackId="3" stroke="#00C49F" fill="#00C49F" fillOpacity={0.3} name="Profit" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Investment Cost Breakdown</h4>
            <ResponsiveContainer width="100%" height={350}>
              <RechartsPieChart>
                <Pie
                  data={costBreakdownData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`₹${costBreakdownData.find(item => item.name === name)?.amount.toLocaleString()}`, 'Amount']}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market Competition Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Market Share Analysis</h4>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={competitionAnalysis}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ competitor, marketShare }) => `${competitor}: ${marketShare}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="marketShare"
                >
                  {competitionAnalysis.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, 'Market Share']}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Competitive Revenue Comparison</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={competitionAnalysis} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="competitor" type="category" width={80} />
                <Tooltip 
                  formatter={(value) => [`₹${(value/100000).toFixed(1)}L`, 'Revenue']}
                />
                <Bar dataKey="revenue" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Location-wise Performance */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
          <MapPin className="mr-2 text-blue-600" />
          Location-wise Performance Analysis
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {locationWiseProfitData.map((location, index) => (
            <LocationCard key={index} {...location} />
          ))}
        </div>

        <div className="mb-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={locationWiseProfitData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="location" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'revenue' || name === 'profit') {
                    return [`₹${(value/1000).toFixed(0)}K`, name === 'revenue' ? 'Revenue' : 'Profit'];
                  }
                  return [value, name];
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#0088FE" name="Revenue" />
              <Bar dataKey="profit" fill="#00C49F" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Financial Projections & ROI Analysis */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-6">Financial Projections & ROI Analysis</h4>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h5 className="font-medium text-gray-700">Investment Summary (2024)</h5>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Initial Investment:</span>
                <span className="font-medium">₹12.5L</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Monthly Operating Cost:</span>
                <span className="font-medium">₹56.7K</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Average Monthly Revenue:</span>
                <span className="font-medium text-green-600">₹100K</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Net Monthly Profit:</span>
                <span className="font-medium text-green-600">₹43.3K</span>
              </div>
              <div className="flex justify-between py-2 font-semibold">
                <span className="text-gray-800">Payback Period:</span>
                <span className="text-blue-600">14 months</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h5 className="font-medium text-gray-700">Key Performance Indicators</h5>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Capacity Utilization:</span>
                <span className="font-medium">73%</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Average Session Value:</span>
                <span className="font-medium">₹142</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Customer Acquisition Cost:</span>
                <span className="font-medium">₹285</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Customer Lifetime Value:</span>
                <span className="font-medium text-green-600">₹2,850</span>
              </div>
              <div className="flex justify-between py-2 font-semibold">
                <span className="text-gray-800">LTV:CAC Ratio:</span>
                <span className="text-green-600">10:1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Projections */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-medium text-gray-800 mb-3">Growth Scenario Analysis</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">Conservative</div>
              <div className="text-sm text-gray-600">10-12% annual growth</div>
              <div className="text-sm font-medium mt-1">5-year NPV: ₹8.2L</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">Realistic</div>
              <div className="text-sm text-gray-600">15-18% annual growth</div>
              <div className="text-sm font-medium mt-1">5-year NPV: ₹12.5L</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">Optimistic</div>
              <div className="text-sm text-gray-600">20-25% annual growth</div>
              <div className="text-sm font-medium mt-1">5-year NPV: ₹18.7L</div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Analysis */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Risk Analysis & Mitigation</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-gray-700 mb-3">Key Risks</h5>
            <div className="space-y-2">
              <div className="flex items-start space-x-2 p-3 bg-red-50 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-red-800">Technology Risk</div>
                  <div className="text-sm text-red-600">Rapid changes in EV charging standards</div>
                </div>
              </div>
              <div className="flex items-start space-x-2 p-3 bg-yellow-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-yellow-800">Competition Risk</div>
                  <div className="text-sm text-yellow-600">Entry of large players with aggressive pricing</div>
                </div>
              </div>
              <div className="flex items-start space-x-2 p-3 bg-orange-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-orange-800">Regulatory Risk</div>
                  <div className="text-sm text-orange-600">Changes in government policies and subsidies</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="font-medium text-gray-700 mb-3">Mitigation Strategies</h5>
            <div className="space-y-2">
              <div className="flex items-start space-x-2 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-green-800">Diversification</div>
                  <div className="text-sm text-green-600">Multiple revenue streams and service offerings</div>
                </div>
              </div>
              <div className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-blue-800">Strategic Partnerships</div>
                  <div className="text-sm text-blue-600">Collaborations with OEMs and fleet operators</div>
                </div>
              </div>
              <div className="flex items-start space-x-2 p-3 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-purple-800">Innovation Focus</div>
                  <div className="text-sm text-purple-600">Continuous technology upgrades and R&D investment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitAnalysisTab;