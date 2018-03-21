import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import routes from './routes/index';
import expressValidator from 'express-validator';
import errorHandlers from './handlers/errorHandlers';


require('dotenv').config({ path: '.env' });

const app = express();

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});


app.use(morgan('dev'));
app.use(cors());

app.use('/api/v1/', routes);

app.get('*', (req, res) => {
  res.status(400).json({
    message: '🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → wrong url ',
  });
});

const port = process.env.PORT || 6000;


if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}

// app.use(errorHandlers.productionErrors);

app.listen(port);

console.log(`Find me on http://localhost:${port}`);


export default app;

