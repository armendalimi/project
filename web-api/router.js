var express = require('express');
var teacherRouter = require('./teacher/routes');
var studentrouter = require('./Students/routes');
var languagerouter = require('./Language/routes')
var postRouter = require('./posts/routes');


const appRouter = express.Router();

appRouter.use(teacherRouter);
appRouter.use(studentrouter);
appRouter.use(languagerouter);

appRouter.use(postRouter);

module.exports = appRouter;