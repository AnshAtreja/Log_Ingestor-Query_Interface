const LogModel = require('../models/logModel');

class LogsController {
  static async createLog(req, res) {
    try {
      const result = await LogModel.createLog(req.body);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async searchLogs(req, res){
    try{
      const queryParams = req.query;
      // console.log(queryParams)
      const searchResults = await LogModel.searchLogs(queryParams);
      res.json(searchResults)
    }
    catch(error){
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async fullTextSearch(req, res) {
    try {
      const searchText = req.query.text; 
      console.log(searchText);
      const searchResults = await LogModel.fullTextSearch(searchText);

      res.json(searchResults);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

}

module.exports = LogsController;
