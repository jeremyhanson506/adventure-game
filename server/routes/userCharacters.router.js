const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// GET /userCharacters
router.get('/', rejectUnauthenticated, (req, res) => {
  // console.log('req.user:', req.user);
  const sqlQuery = `
    SELECT * FROM "user_characters";
  `;

  pool.query(sqlQuery)
    .then((dbRes) => {
      const userCharacters = dbRes.rows;
      // console.log('dbRes.rows:', userCharacters);
      // this gets sent to the client based on sqlQuery
      res.send(userCharacters);
    })
    .catch((dbErr) => {
      console.error('Error /userCharacters GET:', dbErr);
      res.sendStatus(500);
    })
});

// POST /userCharacters
router.post('/', (req, res) => {
  // console.log('req.body:', req.body);
  const newCharacter = req.body;

  const queryText = `
    INSERT INTO "user_characters" ("name", "image_url", "energy_points", "user_id")
      VALUES
      ($1, $2, $3, $4);
  `;
  const queryValues = [
    newCharacter.name,
    newCharacter.image_url,
    newCharacter.energy_points,
    newCharacter.user_id
  ]

  pool.query(queryText, queryValues)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.log('Error newCharacter POST', dbErr);
      res.sendStatus(500);
    });
});

// DELETE
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // Delete an item if it's something the logged in user added
  let characterId = req.params.id;
  // if logged in you can access user.id
  let userId = req.user.id;

  console.log('userId:', userId);
  console.log('characterId:', characterId);

  let queryValues = [characterId, userId];
  let queryText = `
    DELETE FROM "user_characters"
      WHERE "id"=$1
        AND "user_id"=$2;
  `;

  pool.query(queryText, queryValues)
    .then((dbRes) => {
      console.log('dbRes.rows:', dbRes.rows);
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.error('Error userCharacters delete:', dbErr);
      res.sendStatus(500);
    })
})


module.exports = router;