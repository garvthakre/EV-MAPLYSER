import pool from "../config/db.js";

// GET all location suggestions
export const getAllLocationSuggestions = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM location_suggestions ORDER BY score DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a single suggestion by ID
export const getLocationSuggestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM location_suggestions WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Location suggestion not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a new suggestion
export const createLocationSuggestion = async (req, res) => {
  const {
    area_name,
    city,
    latitude,
    longitude,
    score,
    ev_sales,
    population,
    competition
    // REMOVE created_by from the body!
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO location_suggestions (area_name, city, latitude, longitude, score, ev_sales, population, competition, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        area_name,
        city,
        latitude,
        longitude,
        score,
        ev_sales,
        population,
        competition,
        req.user.id // ← automatically the logged-in user!
      ]
    );
    res.status(201).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// UPDATE a suggestion by ID
export const updateLocationSuggestion = async (req, res) => {
  const { id } = req.params;
  const {
    area_name,
    city,
    latitude,
    longitude,
    score,
    ev_sales,
    population,
    competition
  } = req.body;
  try {
    const result = await pool.query(
      `UPDATE location_suggestions
       SET area_name = $1, city = $2, latitude = $3, longitude = $4, score = $5, ev_sales = $6, population = $7, competition = $8
       WHERE id = $9
       RETURNING *`,
      [area_name, city, latitude, longitude, score, ev_sales, population, competition, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Location suggestion not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a suggestion by ID
export const deleteLocationSuggestion = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM location_suggestions WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Location suggestion not found' });
    }
    res.json({ message: 'Location suggestion deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
