const express = require('express');
const router = express.Router();
const { getDB } = require('../../database/db');

// Endpoint for fetching data from the "mezczyzni" collection
router.get('/', async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection('mezczyzni');
    const data = await collection.find({}).toArray();
        // Modyfikacja danych
        const modifiedData = data.map(item => {
          const modifiedItem = {
            NAZWA: item.NAZWA,
          };
          for (const key in item) {
            if (key !== '_id' && key !== 'NAZWA') {
              modifiedItem[key] = item[key];
            }
          }
          return modifiedItem;
        });
    res.json(modifiedData);
  } catch (error) {
    console.error("Error fetching data from the 'mezczyzni' collection", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
