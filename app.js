const path = require("path");
require('dotenv').config({ path: path.join(__dirname, ".env") })

const { setRootPath } = require('./helpers/absolute-path');
setRootPath(__dirname);

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const indexRouter = require('./routes/index');
const collectionsRouter = require('./routes/collections');
const collectionsConfig = require('./controllers/collections/config');

const app = express();

app.use(helmet());
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/experience',
    collectionsConfig('experience.json'),
    collectionsRouter);
app.use('/projects',
    collectionsConfig('projects.json'),
    collectionsRouter);

module.exports = app;
