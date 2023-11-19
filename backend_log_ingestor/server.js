const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logsRouter = require('./routes/logs');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/logs', logsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
