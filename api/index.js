require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(bodyParser.json());

const apiUrl = process.env.API_URL || 'http://127.0.0.1';

app.get('/', (req, res) => {
  res.send('Welcome to LibreTranslate on Render!');
});

app.post('/translate', async (req, res) => {
  try {
    const response = await fetch(`${apiUrl}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`LibreTranslate app listening at http://localhost:${port}`);
});

module.exports = app;
