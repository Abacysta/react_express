const mongodb = require('mongodb');
const csv = require('csv-parser');
const fs = require('fs');

const { connectDB } = require('../database/db');
const { getDB } = require('../database/db');

const importCSV = (filePath, collection) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv({ separator: ',' })) // Ustawiamy separator na przecinek
      .on('data', (data) => {
        const { NAZWA, ...populationData } = data;
        results.push(data);

      })
      .on('end', async () => {
        try {
          const db = getDB();
          await db.collection(collection).insertMany(results);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
  });
};

const importData = async () => {
  try {
    await importCSV('datasets/Kobiety.csv', 'kobiety');
    await importCSV('datasets/Mężczyźni.csv', 'mezczyzni');
    console.log("Data imported successfully");
  } catch (error) {
    console.error("Error importing data", error);
  }
};

module.exports = importData;
