import pool from '../config/db.js';

// GET all profit records
export const getAllProfits = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM profits ORDER BY year DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET profit by ID
export const getProfitById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM profits WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Profit entry not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a new profit entry
export const createProfit = async (req, res) => {
  const {
    year,
    total_revenue,
    total_costs,
    net_profit,
    station_id // Can be null for overall entries
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO profits
      (year, total_revenue, total_costs, net_profit, station_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [year, total_revenue, total_costs, net_profit, station_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a profit entry
export const updateProfit = async (req, res) => {
  const { id } = req.params;
  const {
    year,
    total_revenue,
    total_costs,
    net_profit,
    station_id
  } = req.body;
  try {
    const result = await pool.query(
      `UPDATE profits SET 
        year = $1, total_revenue = $2, total_costs = $3, net_profit = $4, station_id = $5
      WHERE id = $6 RETURNING *`,
      [year, total_revenue, total_costs, net_profit, station_id, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Profit entry not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a profit entry
export const deleteProfit = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM profits WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Profit entry not found' });
    }
    res.json({ message: 'Profit entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
