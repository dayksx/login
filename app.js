const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');

const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.listen(port);

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
  })
);

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated()? 'logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req,res) =>{
    res.send(JSON.stringify(req.oidc.user));
});

