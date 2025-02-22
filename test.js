const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://svargas1121:make120k@mymovieapi.tx01r.mongodb.net/MyMovieApi?retryWrites=true&w=majority";

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
