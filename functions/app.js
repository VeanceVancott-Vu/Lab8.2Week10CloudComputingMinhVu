const express = require('express');
const validator = require('email-validator');

const app = express();

app.use(express.json());

app.get('/hello', (req, res) => {
    console.log('/hello called successfully');
    res.send('Welcome to Firebase Cloud Functions');
});

app.post('/emailValidate', (req, res) => {
    const email = req.body?.email;

    if (!email) {
        return res.status(400).json({
            status: false,
            message: 'Email is required'
        });
    }

    const isValid = validator.validate(email);

    console.log('Email validation completed');

    return res.json({
        status: isValid
    });
});

module.exports = app;