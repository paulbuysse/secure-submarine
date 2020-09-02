const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('req.user:', req.user);
  if (req.user.clearance_level > 13) {
    pool
    .query('SELECT * FROM "secret";')
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
  } else if (req.user.clearance_level > 6) {
    pool
    .query('SELECT * FROM "secret" WHERE "secrecy_level" < 7;')
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
  } else if (req.user.clearance_level > 3) {
    pool
    .query('SELECT * FROM "secret" WHERE "secrecy_level" < 4;')
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }

});

module.exports = router;
