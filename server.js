const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const trackerRoutes = require('./routes/tracker');

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', trackerRoutes);

app.get('/api/track', (req, res) => {
  const parcelId = req.query.parcelId;

  const statuses = [
    'Sorteret i København',
    'Under transport til Malmø',
    'Ankommet til terminal',
    'Udleveret til bud',
    'Leveret'
  ];

  if (!parcelId || parcelId.length < 3) {
    return res.status(400).json({ error: 'Ugyldigt trackingnummer' });
  }

  const response = {
    parcelId,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    lastUpdated: new Date().toISOString()
  };

  res.json(response);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server kører på http://0.0.0.0:${PORT}`);
});
