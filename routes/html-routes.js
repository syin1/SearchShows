// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require('path');

// Routes
// =============================================================
module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // landing page
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  // movie details page
  app.get('/movie-page', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/movie-page.html'));
  });

  // tv-show details page
  app.get('/shows-page', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/shows-page.html'));
  });
};
