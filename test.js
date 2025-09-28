const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.CONNECTION_URI;

const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        await client.close();
    }
}

connectToDatabase();
