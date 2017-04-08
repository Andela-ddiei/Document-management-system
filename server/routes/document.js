const express = require('express');

const router = express.Router();

const documentsController = require('../controllers/document');

const auth = require('../middleware/authentication');

router.route('/documents')
  .post(auth.verifyToken, documentsController.createDocuments);

module.exports = () => router;