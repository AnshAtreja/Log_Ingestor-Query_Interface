
const express = require('express');
const router = express.Router();
const LogsController = require('../controllers/logsController'); // Assuming you have a separate controller file

// Ingest data into Elasticsearch
router.post('/', LogsController.createLog);

// Search logs in Elasticsearch
router.get('/search', LogsController.searchLogs);

router.get('/fulltext', LogsController.fullTextSearch);

// Retrieve detailed logs from PostgreSQL based on Elasticsearch IDs
// router.post('/retrieve', LogsController.retrieveLogs);

module.exports = router;
