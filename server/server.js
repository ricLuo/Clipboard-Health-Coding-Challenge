import 'dotenv/config';

import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';
import compress from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import mongoose from 'mongoose';

import session from 'express-session';
import mongoStore from 'connect-mongodb-session';

import routes from './routes';

const port = process.env.PORT || 4783;
console.log(process.env.PORT);
const env = process.env.NODE_ENV || 'development';
const database = process.env.DB_NAME || 'clipboardinterview';

const app = express();

app.use(compress());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const MongoDBStore = mongoStore(session);

mongoose.connect(`mongodb://localhost/${database}`);

const store = new MongoDBStore({
  uri: `mongodb://localhost/${database}`,
  collection: 'sessions',
});

store.on('error', (error) => {
  console.error('session-store-error', error);
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
}));

app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, '../public')));

routes(app); // initialize routes

if (!module.parent) {
  app.listen(port, '0.0.0.0', (err) => {
    if (err) {
      console.error('application-err', err);
    }
    console.info(`Started in ${env === 'development' ? env : 'production'} mode on port ${port}.`);
  });
}

export default app;
