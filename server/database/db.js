const mongoose = require("mongoose");

const connectDB = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        await mongoose.connect(process.env.MONGO_URL, connectionParams);
        console.log("Connected to database successfully");
    } catch (error) {
        console.error(error);
        console.error("Could not connect to database!");
        process.exit(1); // Wysyłamy sygnał zakończenia procesu z kodem błędu
    }
};

const getDB = () => {
    if (!mongoose.connection) {
        throw new Error("Database connection not established");
    }
    return mongoose.connection.db;
};

module.exports = { connectDB, getDB };
