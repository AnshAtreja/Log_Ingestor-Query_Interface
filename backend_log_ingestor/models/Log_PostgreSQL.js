// const { Sequelize, DataTypes } = require('sequelize');

// const sequelize = new Sequelize({
//   // Your Sequelize configuration
// });

// const LogPostgreSQL = sequelize.define('LogPostgreSQL', {
//   id: {
//     type: DataTypes.UUID, // or INTEGER if your IDs are integers
//     primaryKey: true,
//     defaultValue: Sequelize.UUIDV4, // or auto-increment if using INTEGER
//   },
//   level: { type: DataTypes.STRING },
//   message: { type: DataTypes.STRING },
//   resourceId: { type: DataTypes.STRING },
//   timestamp: { type: DataTypes.DATE },
//   traceId: { type: DataTypes.STRING },
//   spanId: { type: DataTypes.STRING },
//   commit: { type: DataTypes.STRING },
// }, {
//   tableName: 'LogPostgreSQL',
// });

// // Sync the model
// LogPostgreSQL.sync()
//   .then(() => {
//     console.log('LogPostgreSQL model synced with the database');
//   })
//   .catch((error) => {
//     console.error('Error syncing LogPostgreSQL model:', error);
//   });

// module.exports = LogPostgreSQL;
