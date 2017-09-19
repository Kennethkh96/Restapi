"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var BodyParser = require("body-parser");
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
    var result;
    quotes.push({
        Title: req.body.title,
        Desc: req.body.description,
        votes: 0,
        date: new Date()
    });
    result = quotes;
    console.log("added item");
    resp.json(result);
});
app.delete("/api/quotes/:id/delete", function (req, resp) {
    var id = req.params.id;
    quotes.splice(id, 1);
    resp.json("deleted quote: " + id);
});
app.put("/api/quotes/:id/update", function (req, resp) {
    var id = req.params.id;
    quotes[id].Title = req.body.title;
    quotes[id].Desc = req.body.description;
    resp.json("quote: " + id + " has been updated");
});
app.post("/api/quotes/:id/upvote", function (req, resp) {
    var id = req.params.id;
    quotes[id].votes += 1;
    resp.json("Upvoted quote: " + id);
});
app.post("/api/quotes/:id/downvote", function (req, resp) {
    var id = req.body.id;
    quotes[id].votes -= 1;
    resp.json("Upvoted quote: " + id);
});
app.post("/api/quotes/newest", function (req, resp) {
    var result;
    quotes.sort(function (a, b) { return a.date - b.date; });
    if (quotes.length > 10)
        result = quotes.slice(quotes.length - 10, quotes.length);
    else
        result = quotes;
    resp.json(result);
});
app.post("/api/quotes/toprated", function (req, resp) {
    var result;
    quotes.sort(function (a, b) { return b.votes > a.votes ? 1 : -1; });
    result = quotes.slice(0, 10);
    resp.json(result);
});
app.listen(3000);
