const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const charactersRouter = require('./routes/characters.router');
const userCharactersRouter = require('./routes/userCharacters.router');
const itemsRouter = require('./routes/items.router');
const backpackRouter = require('./routes/backpack.router');
const selectedCharacterRouter = require('./routes/selectedCharacter.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/characters', charactersRouter);
app.use('/userCharacters', userCharactersRouter);
app.use('/items', itemsRouter);
app.use('/backpack', backpackRouter);
app.use('/selectedCharacter', selectedCharacterRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
