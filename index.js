"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timers_1 = require("timers");
var spawn = require("child_process").spawn;
var http = require('http');
var express = require("express");
var BATCH_PATH = "job.bat";
var app = express();
var server = http.createServer(app);
app.get("/", function (req, res) { return res.sendFile(__dirname + "/index.html"); });
app.post("/dobatchjob", function (req, res) {
    var ok = true;
    try {
        console.log("spawn " + BATCH_PATH);
        var proc = spawn(BATCH_PATH);
        console.log("setting handlers");
        proc.on("error", function (err) {
            console.log(err);
            ok = false;
        });
        proc.stdout.on('data', function (data) { return console.log(data.toString()); });
        proc.stderr.on('data', function (data) { return console.log(data.toString()); });
    }
    catch (err) {
        console.log(err);
        ok = false;
    }
    timers_1.setTimeout(function (e) {
        res.send("Batch job " + (ok ? "done" : "failed"));
    }, 3000);
    server.close();
});
server.listen(9000, function () {
    console.log("Node engine server started on port " + server.address().port);
});
