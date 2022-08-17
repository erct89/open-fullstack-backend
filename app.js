import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import routes from './src/routes/index.js';
import { requestUnknown } from './src/middlewares/request_unknown.middleware.js';
import { errorHandler } from './src/middlewares/errorHandler.middleware.js';
import { dbConnection } from './src/db/config.js';


// Create express app
const app = express();

// GET server PORT
const PORT = process.env.PORT || 3000;

const API_PATHS = {
  notes: '/api/notes',
  contacts: '/api/contacts',
  search: '/api/search'
};

// Config middleware.
morgan.token('body', (request) => JSON.stringify( request.body || ''));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(morgan(':method :url :status :total-time[0] - :response-time ms :body'));

// Conected db;
dbConnection();

// Routers
app.use(API_PATHS.notes, routes.notes);
app.use(API_PATHS.contacts, routes.contacts);
app.use(API_PATHS.search, routes.search);

// Control URI Unknown
app.use(requestUnknown);
app.use(errorHandler);

// Listener
app.listen( PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});