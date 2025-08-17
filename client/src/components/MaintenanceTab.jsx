// components/MaintenanceTab.jsx
import React, { useState } from 'react';
import { Settings, AlertCircle, CheckCircle, Clock, Wrench, MapPin, Filter } from 'lucide-react';

// Comprehensive Chhattisgarh maintenance data
const chhattisgarhMaintenanceData = [
  {
    station: "Raipur Central Mall - Fast Charge Hub",
    location: "GE Road, Raipur",
    status: "Excellent",
    lastMaintenance: "15 Aug 2024",
    nextDue: "15 Nov 2024",
    alerts: "0 Critical, 1 Minor",
    technician: "Rajesh Kumar",
    uptime: "99.8%",
    chargingPorts: 8,
    avgUsage: "85%"
  },
  {
    station: "Bilaspur Railway Station - DC Hub",
    location: "Railway Station Road, Bilaspur",
    status: "Good",
    lastMaintenance: "22 Jul 2024",
    nextDue: "22 Oct 2024",
    alerts: "1 Critical, 2 Minor",
    technician: "Suresh Patel",
    uptime: "97.2%",
    chargingPorts: 6,
    avgUsage: "78%"
  },
  {
    station: "Durg Steel Authority - Industrial Hub",
    location: "Steel Plant Area, Durg",
    status: "Needs Attention",
    lastMaintenance: "10 Jun 2024",
    nextDue: "10 Sep 2024",
    alerts: "2 Critical, 3 Minor",
    technician: "Amit Singh",
    uptime: "94.5%",
    chargingPorts: 10,
    avgUsage: "92%"
  },
  {
    station: "Korba Thermal Plant - Employee Hub",
    location: "NTPC Township, Korba",
    status: "Good",
    lastMaintenance: "5 Aug 2024",
    nextDue: "5 Nov 2024",
    alerts: "0 Critical, 2 Minor",
    technician: "Pradeep Verma",
    uptime: "98.1%",
    chargingPorts: 6,
    avgUsage: "73%"
  },
  {
    station: "Rajnandgaon Highway Plaza",
    location: "NH-6, Rajnandgaon",
    status: "Excellent",
    lastMaintenance: "18 Aug 2024",
    nextDue: "18 Nov 2024",
    alerts: "0 Critical, 0 Minor",
    technician: "Mohan Yadav",
    uptime: "99.9%",
    chargingPorts: 4,
    avgUsage: "68%"
  },
  {
    station: "Raigarh Mining Complex - Fleet Hub",
    location: "Industrial Area, Raigarh",
    status: "Good",
    lastMaintenance: "12 Jul 2024",
    nextDue: "12 Oct 2024",
    alerts: "1 Critical, 1 Minor",
    technician: "Deepak Sahu",
    uptime: "96.8%",
    chargingPorts: 8,
    avgUsage: "88%"
  },
  {
    station: "Jagdalpur Collectorate - Public Hub",
    location: "Collectorate Complex, Jagdalpur",
    status: "Needs Attention",
    lastMaintenance: "28 May 2024",
    nextDue: "28 Aug 2024",
    alerts: "3 Critical, 2 Minor",
    technician: "Ravi Kashyap",
    uptime: "91.3%",
    chargingPorts: 4,
    avgUsage: "65%"
  },
  {
    station: "Ambikapur Bus Terminal - Transit Hub",
    location: "Bus Stand Area, Ambikapur",
    status: "Good",
    lastMaintenance: "3 Aug 2024",
    nextDue: "3 Nov 2024",
    alerts: "0 Critical, 3 Minor",
    technician: "Santosh Tiwari",
    uptime: "97.5%",
    chargingPorts: 4,
    avgUsage: "58%"
  },
  {
    station: "Mahasamund Market - Commercial Hub",
    location: "Main Market, Mahasamund",
    status: "Excellent",
    lastMaintenance: "25 Aug 2024",
    nextDue: "25 Nov 2024",
    alerts: "0 Critical, 1 Minor",
    technician: "Vinod Kurre",
    uptime: "99.2%",
    chargingPorts: 6,
    avgUsage: "42%"
  }
];

const chhattisgarhMaintenanceAlerts = [
  {
    type: "critical",
    message: "Durg Steel Authority Hub: Connector port #3 showing voltage irregularities. Immediate inspection required.",
    station: "Durg Steel Authority",
    timestamp: "2 hours ago",
    priority: "High"
  },
  {
    type: "critical",
    message: "Jagdalpur Collectorate Hub: Temperature sensors offline for 3 days. Service call scheduled for tomorrow.",
    station: "Jagdalpur Collectorate",
    timestamp: "3 hours ago",
    priority: "High"
  },
  {
    type: "warning",
    message: "Raigarh Mining Complex: Usage exceeded capacity by 15% last week. Consider adding additional charging points.",
    station: "Raigarh Mining Complex",
    timestamp: "6 hours ago",
    priority: "Medium"
  },
  {
    type: "warning",
    message: "Ambikapur Bus Terminal: Backup power system test failed. UPS replacement needed before monsoon season.",
    station: "Ambikapur Bus Terminal",
    timestamp: "1 day ago",
    priority: "Medium"
  },
  {
    type: "info",
    message: "Scheduled maintenance for Bilaspur Railway Station Hub due in 15 days. Parts inventory confirmed.",
    station: "Bilaspur Railway Station",
    timestamp: "1 day ago",
    priority: "Low"
  },
  {
    type: "info",
    message: "New firmware update available for all Korba region stations. Deploy during next maintenance window.",
    station: "Multiple Stations",
    timestamp: "2 days ago",
    priority: "Low"
  },
  {
    type: "info",
    message: "Monsoon season preparation checklist completed for all 9 operational stations in Chhattisgarh.",
    station: "All Stations",
    timestamp: "3 days ago",
    priority: "Low"
  },
  {
    type: "warning",
    message: "Korba Thermal Plant: Minor coolant leak detected in port #2. Scheduled for repair this weekend.",
    station: "Korba Thermal Plant",
    timestamp: "4 hours ago",
    priority: "Medium"
  }
];

const MaintenanceStationCard = ({ station, index, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Good': return 'bg-blue-100 text-blue-800';
      case 'Needs Attention': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUptimeColor = (uptime) => {
    const percentage = parseFloat(uptime);
    if (percentage >= 99) return 'text-green-600';
    if (percentage >= 95) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <h5 className="font-semibold text-gray-800 text-sm">{station.station}</h5>
        <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(station.status)}`}>
          {station.status === 'Excellent' ? <CheckCircle size={12} /> : 
           station.status === 'Good' ? <CheckCircle size={12} /> : 
           <AlertCircle size={12} />}
          <span>{station.status}</span>
        </span>
      </div>
      
      <div className="flex items-center text-xs text-gray-500 mb-3">
        <MapPin size={12} className="mr-1" />
        <span>{station.location}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="text-xs">
          <span className="text-gray-500">Uptime:</span>
          <p className={`font-semibold ${getUptimeColor(station.uptime)}`}>{station.uptime}</p>
        </div>
        <div className="text-xs">
          <span className="text-gray-500">Usage:</span>
          <p className="font-semibold text-gray-700">{station.avgUsage}</p>
        </div>
        <div className="text-xs">
          <span className="text-gray-500">Ports:</span>
          <p className="font-semibold text-gray-700">{station.chargingPorts}</p>
        </div>
        <div className="text-xs">
          <span className="text-gray-500">Technician:</span>
          <p className="font-semibold text-gray-700">{station.technician}</p>
        </div>
      </div>
      
      <div className="space-y-1 text-xs text-gray-600 mb-3">
        <div className="flex items-center">
          <Clock size={12} className="mr-2 text-blue-500" />
          <span>Last: {station.lastMaintenance}</span>
        </div>
        <div className="flex items-center">
          <Wrench size={12} className="mr-2 text-green-500" />
          <span>Next: {station.nextDue}</span>
        </div>
        <div className="flex items-center">
          <AlertCircle size={12} className="mr-2 text-orange-500" />
          <span>Alerts: {station.alerts}</span>
        </div>
      </div>
      
      <button 
        onClick={() => onViewDetails(station)}
        className="w-full py-2 px-3 bg-gray-50 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-100 transition-colors"
      >
        View Details
      </button>
    </div>
  );
};

const MaintenanceAlert = ({ alert, index }) => {
  const getAlertStyle = (type) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`border rounded-lg p-3 ${getAlertStyle(alert.type)}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start space-x-3">
          <AlertCircle size={16} className={`${getAlertIcon(alert.type)} mt-1`} />
          <div className="flex-1">
            <p className="text-sm text-gray-700 mb-1">{alert.message}</p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>Station: {alert.station}</span>
              <span>•</span>
              <span>{alert.timestamp}</span>
            </div>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(alert.priority)}`}>
          {alert.priority}
        </span>
      </div>
    </div>
  );
};

const MaintenanceTab = () => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');

  const filteredStations = chhattisgarhMaintenanceData.filter(station => {
    const statusMatch = filterStatus === 'All' || station.status === filterStatus;
    const locationMatch = filterLocation === 'All' || station.location.includes(filterLocation);
    return statusMatch && locationMatch;
  });

  const statusCounts = {
    excellent: chhattisgarhMaintenanceData.filter(s => s.status === 'Excellent').length,
    good: chhattisgarhMaintenanceData.filter(s => s.status === 'Good').length,
    needsAttention: chhattisgarhMaintenanceData.filter(s => s.status === 'Needs Attention').length,
  };

  const criticalAlerts = chhattisgarhMaintenanceAlerts.filter(alert => alert.type === 'critical').length;
  const totalAlerts = chhattisgarhMaintenanceAlerts.length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Stations</p>
              <p className="text-2xl font-bold text-gray-800">{chhattisgarhMaintenanceData.length}</p>
            </div>
            <Settings className="text-gray-400" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Excellent Status</p>
              <p className="text-2xl font-bold text-green-600">{statusCounts.excellent}</p>
            </div>
            <CheckCircle className="text-green-400" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Need Attention</p>
              <p className="text-2xl font-bold text-yellow-600">{statusCounts.needsAttention}</p>
            </div>
            <AlertCircle className="text-yellow-400" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical Alerts</p>
              <p className="text-2xl font-bold text-red-600">{criticalAlerts}</p>
            </div>
            <AlertCircle className="text-red-400" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <Settings className="mr-2 text-orange-600" />
            Maintenance Assurance - Chhattisgarh Network
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option>All</option>
                <option>Excellent</option>
                <option>Good</option>
                <option>Needs Attention</option>
              </select>
            </div>
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="text-sm border border-gray-300 rounded px-2 py-1"
            >
              <option>All</option>
              <option>Raipur</option>
              <option>Bilaspur</option>
              <option>Durg</option>
              <option>Korba</option>
              <option>Rajnandgaon</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {filteredStations.map((station, index) => (
            <MaintenanceStationCard 
              key={index} 
              station={station} 
              index={index}
              onViewDetails={setSelectedStation}
            />
          ))}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <AlertCircle className="mr-2 text-yellow-600" />
            Maintenance Alerts ({totalAlerts} Total)
          </h4>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {chhattisgarhMaintenanceAlerts.map((alert, index) => (
              <MaintenanceAlert key={index} alert={alert} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceTab;