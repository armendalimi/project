var express = require('express');
const actions = require('./actions');

var routes = express.Router();

routes.get('/teachers', actions.getAllTeachers);
routes.get('/teacher/:id', actions.getSpecificTeacher);
routes.post('/teachers', actions.createTeacher);
routes.put('/teachers/:id', actions.updateTeacher);

module.exports = routes;