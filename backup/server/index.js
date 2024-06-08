require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, getDB } = require('./database/db');
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const kobietyRouter = require('./routes/api/kobiety');
const mezczyzniRouter = require('./routes/api/mezczyzni');
const importData = require('./scripts/importData');


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/kobiety', kobietyRouter);
app.use('/api/mezczyzni', mezczyzniRouter);

// Connect to database and check for collections
(async () => {
  await connectDB(); // Establish connection to the database
  const db = getDB();
  const collections = await db.listCollections().toArray(); // List all collections in the database
  const collectionNames = collections.map(collection => collection.name);

  // Import data if collections do not exist
  if (!collectionNames.includes('kobiety') || !collectionNames.includes('mezczyzni')) {
    try {
      await importData(); // Import data from CSV files into the database
    } catch (error) {
      console.error("Error importing data", error);
    }
  }
})();

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
