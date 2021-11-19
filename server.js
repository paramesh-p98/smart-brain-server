const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'paramesh98',
        database: 'smart-brain'
    }
});

const app = express();

app.use(express.urlencoded({ extended: false }));  //body-parser deprecated in latest express
app.use(express.json());
app.use(cors());


app.post('/signin', (req, res) => { signin.handleSignin(req, res, knex, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, knex) })
app.put('/image', (req, res) => { image.handleImage(req, res, knex) })
app.post('/imageapi', (req, res) => { image.handleApiCall(req, res, knex) })


app.listen(3001, () => {
    console.log('app started on port 3001')
})
