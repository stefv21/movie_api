const express = require('express');
const morgan = require('morgan'); 
const app = express();
const PORT = 8080;

// Use Morgan middleware to log requests
app.use(morgan('dev'));


app.use(express.static('public'));


app.get('/', (req, res) => {
    res.send('Welcome to my Movie API! Here you can find a list of my top 10 movies.');
});


app.get('/movies', (req, res) => {
    res.json({
        movies: [
            "Top Gun",
            "The Little Mermaid",
            "Barbie (2024)",
            "Twisters",
            "The Notebook",
            "Titanic",
            "Pretty Woman",
            "How to Lose a Guy in 10 Days",
            "Pretty in Pink",
            "Anyone But You",
            "The Wedding Planner"
        ]
    });
});


app.use((err, req, res, next) => {
    console.error('Error:', err); 
    res.status(500).send('Something went wrong!'); 
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


