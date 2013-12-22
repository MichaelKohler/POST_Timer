'use strict';
var request = require('../models/request.js');

exports.main = function (req, res) {
    var locals = {};
    locals.interval = req.params.interval || 60; // 60 seconds default interval
    locals.status = request.getStatus(locals.interval);
    locals.lastRequestDate = request.getLastRequestDate();
    res.render('index', locals);
};

exports.ping = function (req, res) {
    request.add(function () {
        res.end();
    });
};

exports.getStatus = function(req, res) {
    var response = {};
    var interval = req.params.interval || 60; // 60 seconds default interval
    response.status = request.getStatus(interval);
    response.lastRequest = request.getLastRequest();
    res.json(JSON.stringify(response));
    console.log("Status: " + JSON.stringify(response));
    res.end();
};
