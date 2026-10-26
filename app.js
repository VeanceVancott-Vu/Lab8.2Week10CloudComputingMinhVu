
const express = require('express');
const validator = require('email-validator');

const app = express();

app.use(express.json());

// Step 1: Test the welcome endpoint

app.get('/hello', (req, res) => {
    console.log('/hello called successfully');
    res.send('Welcome to Firebase Cloud Functions');
});

// Step 2: Browser-based email testing page

app.get('/test', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Validation Test</title>
        </head>
        <body>
            <h1>Email Validation Test</h1>

            <form id="emailForm">
                <label for="email">Enter an email address:</label>
                <input
                    type="text"
                    id="email"
                    placeholder="test@example.com"
                    required
                >
                <button type="submit">Validate Email</button>
            </form>

            <h2>Result</h2>
            <pre id="result">Enter an email and click Validate Email.</pre>

            <script>
                document.getElementById('emailForm')
                    .addEventListener('submit', async function(event) {
                        event.preventDefault();

                        const email = document.getElementById('email').value;
                        const result = document.getElementById('result');

                        result.textContent = 'Checking...';

                        try {
                            const response = await fetch('/emailValidate', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ email: email })
                            });

                            const data = await response.json();

                            result.textContent =
                                'HTTP Status: ' + response.status + '\\n' +
                                JSON.stringify(data, null, 2);
                        } catch (error) {
                            result.textContent = 'Error: ' + error.message;
                        }
                    });
            </script>
        </body>
        </html>
    `);
});

// Step 3: Validate email addresses
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