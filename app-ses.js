const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`login`);
});

app.get('/login', (req, res) => {
    res.send(``);
});

app.post('/login', (req, res) => {
    const { username } = req.body;

    if (username) {
        req.session.username = username;
        return res.redirect('/dashboard');
    }
    res.send('Login failed');
});

app.get('/dashboard', (req, res) => {
    if (req.session.username) {
        res.send(`${req.session.username}`);
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Error logging out');
        }
        res.send('Logged out!');
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
