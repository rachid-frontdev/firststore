const app = require('express')();
const postLogin = require('./login.js');
const postSignup = require('./register.js');

// Ensure that `req.query` values are always strings or nullish
app.set('query parser', 'simple');
app.use(express.json());
app.post('/login', postLogin.handleLogin);
app.post('/register', postSignup.register);
// The rest of the functionality requires being logged in.
app.use(require('./checkAuth'));
app.put('/user', require('./updateUser').updateUser);
app.get('/users', require('./findUsers'));
// Error handling middleware
app.use(function(err, req, res, next) {
res.status(500).json({ message: err.message });
});
module.exports = app;
