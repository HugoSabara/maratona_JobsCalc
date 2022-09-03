const express = require("express");
const routes = express.Router();
const ProfileController = require("./controllers/ProfileController");
const JobController = require("./controllers/JobController");
const DashboardController = require("./controllers/DashboardController");

//request, response
//quando for enviar um HTML sendFile.
//quando utilizar EJS utilizar render (pois o ejs vai renderizar antes de enviar)
routes.get('/', DashboardController.index);
routes.get('/job',JobController.create);
routes.post('/job', JobController.save);
routes.get('/job/:id',JobController.show);
routes.post('/job/:id',JobController.update);
routes.post('/job/delete/:id',JobController.delete);
routes.get('/profile',ProfileController.index);
routes.post('/profile',ProfileController.update);


module.exports = routes;