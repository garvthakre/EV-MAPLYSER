// components/MaintenanceTab.jsx
import React from 'react';
import { Settings, AlertCircle, CheckCircle } from 'lucide-react';

const MaintenanceStationCard = ({ station, index }) => (
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
);

const MaintenanceAlert = ({ alert, index }) => (
  <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg ${
    alert.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
  }`}>
    <AlertCircle size={16} className={alert.type === 'warning' ? 'text-yellow-600 mt-1' : 'text-blue-600 mt-1'} />
    <p className="text-sm text-gray-700">{alert.message}</p>
  </div>
);

const MaintenanceTab = ({ maintenanceData, maintenanceAlerts }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Settings className="mr-2 text-orange-600" />
          Maintenance Assurance
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {maintenanceData.map((station, index) => (
            <MaintenanceStationCard key={index} station={station} index={index} />
          ))}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <AlertCircle className="mr-2 text-yellow-600" />
            Maintenance Alerts
          </h4>
          <div className="space-y-2">
            {maintenanceAlerts.map((alert, index) => (
              <MaintenanceAlert key={index} alert={alert} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceTab;