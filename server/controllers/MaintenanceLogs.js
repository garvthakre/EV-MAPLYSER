import pool from '../config/db.js';

// Get all maintenance logs
export const getAllMaintenanceLogs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM maintenance_logs ORDER BY next_due');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get ONE maintenance log by ID
export const getMaintenanceLogById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM maintenance_logs WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Maintenance log not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a new maintenance log (assigns performed_by from req.user)
export const createMaintenanceLog = async (req, res) => {
  const {
    station_id,
    performed_on,
    notes,
    status,
    next_due,
    alerts
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO maintenance_logs 
        (station_id, performed_on, performed_by, notes, status, next_due, alerts)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        station_id,
        performed_on,
        req.user.id, // pulled from authMiddleware
        notes,
        status,
        next_due,
        alerts
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a maintenance log
export const updateMaintenanceLog = async (req, res) => {
  const { id } = req.params;
  const {
    station_id,
    performed_on,
    notes,
    status,
    next_due,
    alerts
  } = req.body;
  try {
    const result = await pool.query(
      `UPDATE maintenance_logs SET 
        station_id = $1,
        performed_on = $2,
        notes = $3,
        status = $4,
        next_due = $5,
        alerts = $6
      WHERE id = $7
      RETURNING *`,
      [station_id, performed_on, notes, status, next_due, alerts, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Maintenance log not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a maintenance log
export const deleteMaintenanceLog = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM maintenance_logs WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Maintenance log not found' });
    }
    res.json({ message: 'Maintenance log deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
