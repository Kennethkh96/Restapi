"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var BodyParser = require("body-parser");
var HTTP = require("http-status-codes");
var app = Express();
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var quotes = [
    {
        "Title": "test1",
        "Desc": "testing desc",
        "votes": 0,
        "date": new Date()
    },
    {
        "Title": "test2",
        "Desc": "testing desc",
        "votes": 0,
        "date": new Date("Wed Sep 20 2017")
    },
    {
        "Title": "test3",
        "Desc": "testing desc",
        "votes": 0,
        "date": new Date("Mon Sep 18 2017")
    },
];
app.post("/api/quotes/create", function (req, resp) {
    quotes.push({
        Title: req.body.title,
        Desc: req.body.description,
        votes: 0,
        date: new Date()
    });
    resp.status(HTTP.CREATED).send();
});
app.delete("/api/quotes/:id/delete", function (req, resp) {
    var id = req.params.id;
    quotes.splice(id, 1);
    resp.status(HTTP.NO_CONTENT).send();
});
app.put("/api/quotes/:id/update", function (req, resp) {
    var id = req.params.id;
    quotes[id].Title = req.body.title;
    quotes[id].Desc = req.body.description;
    resp.status(HTTP.NO_CONTENT).send();
});
app.post("/api/quotes/:id/upvote", function (req, resp) {
    var id = req.params.id;
    quotes[id].votes += 1;
    resp.status(HTTP.NO_CONTENT).send();
});
app.post("/api/quotes/:id/downvote", function (req, resp) {
    var id = req.body.id;
    quotes[id].votes -= 1;
    resp.status(HTTP.NO_CONTENT).send();
});
app.get("/api/quotes/newest", function (req, resp) {
    var result;
    quotes.sort(function (a, b) { return a.date - b.date; });
    if (quotes.length > 10)
        result = quotes.slice(quotes.length - 10, quotes.length);
    else
        result = quotes;
    resp.status(HTTP.OK).json(result);
});
app.get("/api/quotes/toprated", function (req, resp) {
    var result;
    quotes.sort(function (a, b) { return b.votes > a.votes ? 1 : -1; });
    result = quotes.slice(0, 10);
    resp.status(HTTP.OK).json(result);
});
app.options("*", function (req, resp) {
    resp.status(HTTP.OK).json("*");
});
app.listen(3000);
