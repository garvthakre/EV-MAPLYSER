import pool from '../config/db.js';

// GET all usage logs
export const getAllUsageLogs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usage_logs ORDER BY usage_date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET usage log by ID
export const getUsageLogById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM usage_logs WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usage log not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a usage log
export const createUsageLog = async (req, res) => {
  const {
    station_id,
    usage_date,
    total_sessions,
    total_kwh,
    peak_hours,
    revenue
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO usage_logs 
      (station_id, usage_date, total_sessions, total_kwh, peak_hours, revenue)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [station_id, usage_date, total_sessions, total_kwh, peak_hours, revenue]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a usage log
export const updateUsageLog = async (req, res) => {
  const { id } = req.params;
  const {
    station_id,
    usage_date,
    total_sessions,
    total_kwh,
    peak_hours,
    revenue
  } = req.body;
  try {
    const result = await pool.query(
      `UPDATE usage_logs SET 
        station_id = $1, usage_date = $2,
        total_sessions = $3, total_kwh = $4, peak_hours = $5, revenue = $6
      WHERE id = $7 RETURNING *`,
      [station_id, usage_date, total_sessions, total_kwh, peak_hours, revenue, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usage log not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a usage log
export const deleteUsageLog = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM usage_logs WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usage log not found' });
    }
    res.json({ message: 'Usage log deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
