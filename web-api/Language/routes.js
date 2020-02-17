var express = require('express');
const actions = require('./actions');

var routes = express.Router();

routes.get('/language', actions.getAllLanguage);
routes.get('/language/:id', actions.getSpecificLanguage);
routes.post('/language', actions.createLanguage);
routes.put('/language/:id', actions.updateLanguage);

module.exports = routes;