const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');
const { authenticateToken, runCheckPermission } = require('../middleware/auth-middleware');

router.get('/login', (req, res) => {
  res.render('login');
})

router.post('/login', async (req, res) => {
  await authController.login(req, res);
});

router.get('/register', (req, res) => {
  res.render('register');
})

router.post('/register', async (req, res) => {
  await authController.register(req, res);
})

router.get('/api/admin', authenticateToken, runCheckPermission ,(req, res) => {
  res.send('This is admin page!');
});

router.get('/api/editor', authenticateToken, runCheckPermission, (req, res) => {
  res.send('This is editor page!');
});

router.get('/api/user', authenticateToken, runCheckPermission, (req, res) => {
  res.send('This is user page!');
})

router.get('/api/manager', authenticateToken, runCheckPermission, (req, res) => {
  res.send('This is manager page!');
})

router.get('/api/emanager', authenticateToken, runCheckPermission, (req, res) => {
  res.send('This is employee manager page!');
})

module.exports = router;
