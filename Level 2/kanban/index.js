"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var BodyParser = require("body-parser");
var HTTP = require("http-status-codes");
var Fs = require("fs");
var app = Express();
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var board = Fs.readFileSync("board.txt");
app.get("/kanban/api", function (req, resp) {
    resp.status(HTTP.OK).send("" + board);
});
app.post("/kanban/api", function (req, resp) {
    board = req.body;
    Fs.writeFileSync("board.txt", JSON.stringify(board));
    resp.status(HTTP.NO_CONTENT).send();
});
app.options("*", function (req, resp) {
    resp.status(HTTP.OK).send("*");
});
app.listen(3000);
console.log("listening on 3000...");
