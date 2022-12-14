const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const monsterRouter = require('./routes/monster.router')
const mapRouter = require('./routes/map.router')
const movementRouter = require('./routes/movement.router')
const companionRouter = require('./routes/companion.router')
const itemRouter = require('./routes/item.router')

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
app.use('/api/monster', monsterRouter)
app.use('/api/map', mapRouter)
app.use('/api/movement', movementRouter)
app.use('/api/companion', companionRouter)
app.use('/api/item', itemRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
