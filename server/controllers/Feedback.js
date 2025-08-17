import pool from '../config/db.js';

// GET all feedback (admin view)
export const getAllFeedback = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM feedback ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET feedback by ID
export const getFeedbackById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM feedback WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE feedback (user_id from token!)
export const createFeedback = async (req, res) => {
  const { subject, message, flagged } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO feedback (user_id, subject, message, flagged)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [req.user.id, subject, message, flagged ?? false]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE feedback (e.g., admin flagging)
export const updateFeedback = async (req, res) => {
  const { id } = req.params;
  const { subject, message, flagged } = req.body;
  try {
    const result = await pool.query(
      `UPDATE feedback SET 
        subject = $1, message = $2, flagged = $3
      WHERE id = $4 RETURNING *`,
      [subject, message, flagged, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE feedback
export const deleteFeedback = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM feedback WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json({ message: 'Feedback deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
