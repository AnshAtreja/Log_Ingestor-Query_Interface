// index.js
const express = require('express');
// const { Sequelize } = require('sequelize');
const cors = require('cors');
const bodyParser = require('body-parser');
const logsRouter = require('./routes/logs');
// const LogPostgreSQL = require('./models/Log_PostgreSQL');
// const postgresURI = process.env.POSTGRES_URI || 'postgres://postgres:ansh2002@127.0.0.1:5432/logpostgre';

// Connect to PostgreSQL
// const sequelize = new Sequelize({
//     dialect: 'postgres',
//     host: '127.0.0.1',
//     port: 5432,
//     username: 'postgres', // Make sure this is your correct PostgreSQL username
//     password: 'ansh2002', // Make sure this is your correct PostgreSQL password
//     database: 'logpostgre',
//   });
  
//   sequelize.authenticate()
//     .then(() => {
//       console.log('Connected to PostgreSQL');
//     })
//     .catch((error) => {
//       console.error('PostgreSQL connection error:', error);
//     });

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/logs', logsRouter);

// process.on('SIGINT', () => {
//     console.log('Closing PostgreSQL connection');
//     sequelize.close().then(() => {
//       console.log('PostgreSQL connection closed');
//       process.exit();
//     });
//   });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
