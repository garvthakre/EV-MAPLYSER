// hooks/useDashboard.js
import { useState, useEffect, useCallback } from 'react';
import ApiService from '../services/api';

export const useDashboard = (refreshInterval = 5 * 60 * 1000) => {
  const [data, setData] = useState({
    stats: {
      activeStations: 0,
      monthlyUsage: 0,
      coverageAreas: 0,
      avgUtilization: 0
    },
    chartData: [],
    stationPerformance: [],
    revenueData: [],
    peakUsageData: []
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardStats = useCallback(async () => {
    try {
      const response = await ApiService.getDashboardStats();
      setData(prev => ({ ...prev, stats: response }));
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      throw err;
    }
  }, []);

  const fetchUsageAnalytics = useCallback(async (months = 12) => {
    try {
      const response = await ApiService.getUsageAnalytics(months);
      setData(prev => ({ ...prev, chartData: response }));
    } catch (err) {
      console.error('Error fetching usage analytics:', err);
      throw err;
    }
  }, []);

  const fetchStationPerformance = useCallback(async () => {
    try {
      const response = await ApiService.getStationPerformance();
      setData(prev => ({ ...prev, stationPerformance: response }));
    } catch (err) {
      console.error('Error fetching station performance:', err);
      throw err;
    }
  }, []);

  const fetchRevenueData = useCallback(async () => {
    try {
      const response = await ApiService.getRevenueTrends();
      setData(prev => ({ ...prev, revenueData: response }));
    } catch (err) {
      console.error('Error fetching revenue data:', err);
      throw err;
    }
  }, []);

  const fetchPeakUsageData = useCallback(async () => {
    try {
      const response = await ApiService.getPeakUsageAnalysis();
      setData(prev => ({ ...prev, peakUsageData: response }));
    } catch (err) {
      console.error('Error fetching peak usage data:', err);
      throw err;
    }
  }, []);

  const refreshAllData = useCallback(async (months = 12) => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        fetchDashboardStats(),
        fetchUsageAnalytics(months),
        fetchStationPerformance(),
        fetchRevenueData(),
        fetchPeakUsageData()
      ]);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard data fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchDashboardStats, fetchUsageAnalytics, fetchStationPerformance, fetchRevenueData, fetchPeakUsageData]);

  const refreshStats = useCallback(async () => {
    try {
      await fetchDashboardStats();
    } catch (err) {
      setError('Failed to refresh statistics');
    }
  }, [fetchDashboardStats]);

  // Initial data load
  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  // Auto-refresh interval
  useEffect(() => {
    if (refreshInterval > 0) {
      const interval = setInterval(() => {
        refreshStats();
      }, refreshInterval);
      
      return () => clearInterval(interval);
    }
  }, [refreshStats, refreshInterval]);

  return {
    data,
    loading,
    error,
    refreshAllData,
    refreshStats,
    fetchUsageAnalytics,
    fetchStationPerformance,
    fetchRevenueData,
    fetchPeakUsageData
  };
};