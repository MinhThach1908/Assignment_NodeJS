const express = require('express');
const app = express();

function isAuthenticated(req, res, next) {
    const isLoggedIn = req.query.loggedIn;

    if (isLoggedIn === 'true') {
        next();
    } else {
        res.status(401).send('You need to log in to access this page');
    }
}

app.get('/dashboard', isAuthenticated, (req, res) => {
    res.send('Welcome to the dashboard!');
});

app.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
