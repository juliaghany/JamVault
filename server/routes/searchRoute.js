const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/search', async (req, res) => {
  const { artist, minDate, maxDate } = req.query;

  try {
    const response = await axios.get(`https://concerts-artists-events-tracker.p.rapidapi.com/artist/past?name=${artist}&minDate=${minDate}&maxDate=${maxDate}`, {
      headers: {
        'X-Rapidapi-Key': '82525c6f6amsh187efe905130ca1p15c49bjsn2baa38854472',
        'X-Rapidapi-Host': `concerts-artists-events-tracker.p.rapidapi.com`,
        'Host': `concerts-artists-events-tracker.p.rapidapi.com` 
      }
    });

    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

module.exports = router;