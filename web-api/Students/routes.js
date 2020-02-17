var express = require('express');
const actions = require('./actions');

var routes = express.Router();

routes.get('/student', actions.getAllStudent);
routes.get('/student/:id', actions.getSpecificStudent);
routes.post('/student', actions.createStudent);
routes.put('/student/:id', actions.updateStudent);

module.exports = routes;