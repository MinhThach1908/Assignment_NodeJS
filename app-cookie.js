const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
    if (req.cookies.username) {
        res.send(`${req.cookies.username}`);
    }
});

app.get('/login', (req, res) => {

});

app.post('/login', express.urlencoded({ extended: true }), (req, res) => {
    const { username } = req.body;

    if (username) {
        res.cookie('username', username, { maxAge: 24 * 60 * 60 * 1000 });
        res.redirect('/');
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('username');
    res.send('Logged out!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
