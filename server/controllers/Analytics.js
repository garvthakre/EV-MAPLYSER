// controllers/Analytics.js
import pool from '../config/db.js';

// GET dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    // Get active stations count
    const activeStationsResult = await pool.query(
      'SELECT COUNT(*) as count FROM stations WHERE active = true'
    );
    const activeStations = parseInt(activeStationsResult.rows[0].count);

    // Get monthly usage (current month's total sessions)
    const monthlyUsageResult = await pool.query(
      `SELECT COALESCE(SUM(total_sessions), 0) as total 
       FROM usage_logs 
       WHERE DATE_TRUNC('month', usage_date) = DATE_TRUNC('month', CURRENT_DATE)`
    );
    const monthlyUsage = parseInt(monthlyUsageResult.rows[0].total);

    // Get coverage areas (distinct locations count based on unique location strings)
    const coverageAreasResult = await pool.query(
      `SELECT COUNT(DISTINCT location) as count 
       FROM stations 
       WHERE active = true`
    );
    const coverageAreas = parseInt(coverageAreasResult.rows[0].count);

    // Calculate average utilization (assuming peak_hours is a string like "9-17", extract hours)
    const utilizationResult = await pool.query(
      `SELECT 
         AVG(
           CASE 
             WHEN peak_hours IS NOT NULL AND peak_hours != '' 
             THEN (total_sessions::float / 8.0) * 100  -- Assuming 8 hours average
             ELSE 0
           END
         ) as avg_utilization
       FROM usage_logs 
       WHERE usage_date >= CURRENT_DATE - INTERVAL '30 days'`
    );
    const avgUtilization = Math.round(utilizationResult.rows[0].avg_utilization || 0);

    res.json({
      activeStations,
      monthlyUsage,
      coverageAreas,
      avgUtilization
    });
  } catch (err) {
    console.error('Error calculating dashboard stats:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET usage analytics data for charts
export const getUsageAnalytics = async (req, res) => {
  try {
    const { months = 12 } = req.query;
    
    // Get monthly usage data for the chart
    const analyticsResult = await pool.query(
      `SELECT 
         TO_CHAR(usage_date, 'Mon YYYY') as month,
         SUM(total_sessions) as sessions,
         SUM(total_kwh) as kwh_consumed,
         SUM(revenue) as revenue,
         COUNT(DISTINCT station_id) as active_stations
       FROM usage_logs 
       WHERE usage_date >= CURRENT_DATE - INTERVAL '${parseInt(months)} months'
       GROUP BY TO_CHAR(usage_date, 'Mon YYYY'), DATE_TRUNC('month', usage_date)
       ORDER BY DATE_TRUNC('month', usage_date)`
    );

    // Format data for the chart
    const chartData = analyticsResult.rows.map(row => ({
      month: row.month,
      sales: parseInt(row.sessions) || 0, // Using sessions as "sales" for the chart
      stations: parseInt(row.active_stations) || 0,
      kwh: parseFloat(row.kwh_consumed) || 0,
      revenue: parseFloat(row.revenue) || 0
    }));

    res.json(chartData);
  } catch (err) {
    console.error('Error fetching usage analytics:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET station performance metrics
export const getStationPerformance = async (req, res) => {
  try {
    const performanceResult = await pool.query(
      `SELECT 
         s.name as station_name,
         s.id as station_id,
         s.location,
         COALESCE(SUM(ul.total_sessions), 0) as total_sessions,
         COALESCE(SUM(ul.total_kwh), 0) as total_kwh,
         COALESCE(SUM(ul.revenue), 0) as total_revenue,
         COALESCE(AVG(ul.total_sessions), 0) as avg_daily_sessions,
         s.active,
         s.capacity_kw
       FROM stations s
       LEFT JOIN usage_logs ul ON s.id = ul.station_id 
         AND ul.usage_date >= CURRENT_DATE - INTERVAL '30 days'
       GROUP BY s.id, s.name, s.location, s.active, s.capacity_kw
       ORDER BY total_revenue DESC`
    );

    const formattedData = performanceResult.rows.map(row => ({
      stationId: row.station_id,
      stationName: row.station_name,
      location: row.location,
      totalSessions: parseInt(row.total_sessions),
      totalKwh: parseFloat(row.total_kwh) || 0,
      totalRevenue: parseFloat(row.total_revenue) || 0,
      avgDailySessions: parseFloat(row.avg_daily_sessions).toFixed(2),
      active: row.active,
      capacityKw: row.capacity_kw,
      efficiency: row.total_kwh > 0 ? (row.total_revenue / row.total_kwh).toFixed(2) : 0
    }));

    res.json(formattedData);
  } catch (err) {
    console.error('Error fetching station performance:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET peak usage hours analysis
export const getPeakUsageAnalysis = async (req, res) => {
  try {
    // Since peak_hours is a string, we'll analyze the most common peak hour patterns
    const peakAnalysisResult = await pool.query(
      `SELECT 
         peak_hours,
         COUNT(*) as frequency,
         AVG(total_sessions) as avg_sessions,
         SUM(total_kwh) as total_kwh,
         SUM(revenue) as total_revenue
       FROM usage_logs 
       WHERE usage_date >= CURRENT_DATE - INTERVAL '30 days'
         AND peak_hours IS NOT NULL 
         AND peak_hours != ''
       GROUP BY peak_hours
       ORDER BY frequency DESC, avg_sessions DESC
       LIMIT 10`
    );

    const peakData = peakAnalysisResult.rows.map(row => ({
      peakHours: row.peak_hours,
      frequency: parseInt(row.frequency),
      avgSessions: parseFloat(row.avg_sessions).toFixed(2),
      totalKwh: parseFloat(row.total_kwh) || 0,
      totalRevenue: parseFloat(row.total_revenue) || 0
    }));

    res.json(peakData);
  } catch (err) {
    console.error('Error fetching peak usage analysis:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET revenue trends
export const getRevenueTrends = async (req, res) => {
  try {
    const revenueResult = await pool.query(
      `SELECT 
         usage_date as date,
         SUM(revenue) as daily_revenue,
         SUM(total_kwh) as daily_kwh,
         SUM(total_sessions) as daily_sessions,
         COUNT(DISTINCT station_id) as active_stations
       FROM usage_logs 
       WHERE usage_date >= CURRENT_DATE - INTERVAL '30 days'
       GROUP BY usage_date
       ORDER BY usage_date`
    );

    const trendData = revenueResult.rows.map(row => ({
      date: row.date,
      revenue: parseFloat(row.daily_revenue) || 0,
      kwh: parseFloat(row.daily_kwh) || 0,
      sessions: parseInt(row.daily_sessions) || 0,
      activeStations: parseInt(row.active_stations) || 0,
      revenuePerKwh: row.daily_kwh > 0 ? (row.daily_revenue / row.daily_kwh).toFixed(2) : 0,
      revenuePerSession: row.daily_sessions > 0 ? (row.daily_revenue / row.daily_sessions).toFixed(2) : 0
    }));

    res.json(trendData);
  } catch (err) {
    console.error('Error fetching revenue trends:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET maintenance alerts and status
export const getMaintenanceOverview = async (req, res) => {
  try {
    const maintenanceResult = await pool.query(
      `SELECT 
         ml.status,
         COUNT(*) as count,
         AVG(ml.alerts) as avg_alerts,
         array_agg(DISTINCT s.name) as station_names
       FROM maintenance_logs ml
       JOIN stations s ON ml.station_id = s.id
       WHERE ml.performed_on >= CURRENT_DATE - INTERVAL '30 days'
       GROUP BY ml.status
       ORDER BY 
         CASE ml.status 
           WHEN 'Critical' THEN 1
           WHEN 'Warning' THEN 2  
           WHEN 'Good' THEN 3
           WHEN 'Excellent' THEN 4
         END`
    );

    const maintenanceData = maintenanceResult.rows.map(row => ({
      status: row.status,
      count: parseInt(row.count),
      avgAlerts: parseFloat(row.avg_alerts).toFixed(1),
      stationNames: row.station_names
    }));

    // Get upcoming maintenance due dates
    const upcomingResult = await pool.query(
      `SELECT 
         s.name as station_name,
         ml.next_due,
         ml.status,
         ml.alerts
       FROM maintenance_logs ml
       JOIN stations s ON ml.station_id = s.id
       WHERE ml.next_due <= CURRENT_DATE + INTERVAL '7 days'
         AND ml.next_due >= CURRENT_DATE
       ORDER BY ml.next_due`
    );

    const upcomingMaintenance = upcomingResult.rows.map(row => ({
      stationName: row.station_name,
      nextDue: row.next_due,
      status: row.status,
      alerts: row.alerts
    }));

    res.json({
      statusBreakdown: maintenanceData,
      upcomingMaintenance: upcomingMaintenance
    });
  } catch (err) {
    console.error('Error fetching maintenance overview:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET yearly profits analysis  
export const getProfitsAnalysis = async (req, res) => {
  try {
    const profitsResult = await pool.query(
      `SELECT 
         p.year,
         s.name as station_name,
         p.total_revenue,
         p.total_costs,
         p.net_profit,
         CASE 
           WHEN p.total_costs > 0 THEN (p.net_profit / p.total_costs) * 100
           ELSE 0
         END as profit_margin
       FROM profits p
       JOIN stations s ON p.station_id = s.id
       ORDER BY p.year DESC, p.net_profit DESC`
    );

    const yearlyProfits = profitsResult.rows.map(row => ({
      year: row.year,
      stationName: row.station_name,
      totalRevenue: parseFloat(row.total_revenue),
      totalCosts: parseFloat(row.total_costs),
      netProfit: parseFloat(row.net_profit),
      profitMargin: parseFloat(row.profit_margin).toFixed(2)
    }));

    // Get year-over-year summary
    const summaryResult = await pool.query(
      `SELECT 
         year,
         SUM(total_revenue) as year_revenue,
         SUM(total_costs) as year_costs,
         SUM(net_profit) as year_profit,
         COUNT(DISTINCT station_id) as stations_count
       FROM profits
       GROUP BY year
       ORDER BY year DESC`
    );

    const yearlySummary = summaryResult.rows.map(row => ({
      year: row.year,
      yearRevenue: parseFloat(row.year_revenue),
      yearCosts: parseFloat(row.year_costs),
      yearProfit: parseFloat(row.year_profit),
      stationsCount: parseInt(row.stations_count)
    }));

    res.json({
      stationProfits: yearlyProfits,
      yearlySummary: yearlySummary
    });
  } catch (err) {
    console.error('Error fetching profits analysis:', err);
    res.status(500).json({ error: err.message });
  }
};