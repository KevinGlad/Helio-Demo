const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

// database DAL
const db = require('./database/mongo')

// routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiUsersRouter = require('./routes/api/v1/apiUsers')
const apiSpellsRouter = require('./routes/api/v1/apiSpells')
const apiCharactersRouter = require('./routes/api/v1/apiCharacters')
const apiLogin = require('./routes/api/v1/apiLogin')

const app = express();

db.connect(app.locals)
  .then(() => {

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(cors()) // first for use in all responses
    
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    // app.use('/', indexRouter);
    app.use('/users', usersRouter);

    // api routes
    app.use('/api/v1/users', apiUsersRouter)
    app.use('/api/v1/spells', apiSpellsRouter)
    app.use('/api/v1/characters', apiCharactersRouter)
    app.use('/api/v1/login', apiLogin)
    
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });

    // close database when ^C is pressed
    process.on('SIGINT', () => {
      db.close()
      process.exit()
    })

  })
module.exports = app;
