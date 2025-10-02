const express = require('express');
const router = express.Router();

const statuses = [
  'Sorteret i København',
  'Under transport til Malmø',
  'Ankommet til terminal',
  'Udleveret til bud',
  'Leveret'
];

router.get('/track', (req, res) => {
  const parcelId = req.query.parcelId;

  if (!parcelId || parcelId.length < 3) {
    return res.status(400).json({ error: 'Ugyldigt trackingnummer' });
  }

  const response = {
    parcelId,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    lastUpdated: new Date().toISOString()
  };

  res.cookie('lastParcelId', parcelId, { maxAge: 3600000 });
  res.json(response);
});

router.get('/last', (req, res) => {
  const lastParcelId = req.cookies.lastParcelId;
  if (!lastParcelId) {
    return res.status(404).json({ error: 'Ingen tidligere tracking' });
  }
  res.json({ lastTracked: lastParcelId });
});

module.exports = router;
