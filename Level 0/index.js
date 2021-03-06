"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var BodyParser = require("body-parser");
var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var quotes = [
    {
        "Title": "test1",
        "Desc": "testing desc",
        "votes": 0
    },
    {
        "Title": "test2",
        "Desc": "testing desc",
        "votes": 0
    },
    {
        "Title": "test3",
        "Desc": "testing desc",
        "votes": 0
    },
    {
        "Title": "test4",
        "Desc": "testing desc",
        "votes": 0
    },
    {
        "Title": "test5",
        "Desc": "testing desc",
        "votes": 0
    },
    {
        "Title": "test6",
        "Desc": "testing desc",
        "votes": 0
    },
    {
        "Title": "test7",
        "Desc": "testing desc",
        "votes": 0
    },
    {
        "Title": "test8",
        "Desc": "testing desc",
        "votes": 0
    },
    {
        "Title": "test9",
        "Desc": "testing desc",
        "votes": -25
    },
    {
        "Title": "test10",
        "Desc": "testing desc",
        "votes": -1
    },
    {
        "Title": "test11",
        "Desc": "testing desc",
        "votes": 5
    },
    {
        "Title": "test12",
        "Desc": "testing desc",
        "votes": 2
    },
    {
        "Title": "test13",
        "Desc": "testing desc",
        "votes": 1
    }
];
app.post("/api", function (req, resp) {
    var result;
    var func = req.body.function;
    if (func === "create") {
        quotes.push({
            Title: req.body.title,
            Desc: req.body.description,
            votes: 0
        });
        result = quotes;
    }
    else if (func === 'upvote') {
        var id = req.body.id;
        quotes[id].votes += 1;
        result = "Upvoted quote: " + id;
    }
    else if (func === 'downvote') {
        var id = req.body.id;
        quotes[id].votes -= 1;
        result = "Upvoted quote: " + id;
    }
    else if (func === 'newest') {
        if (quotes.length > 10)
            result = quotes.slice(quotes.length - 10, quotes.length);
        else
            result = quotes;
    }
    else if (func === 'toprated') {
        var res = quotes.slice(0);
        res.sort(function (a, b) { return b.votes > a.votes ? 1 : -1; });
        if (res.length > 10)
            result = res.slice(0, 10);
        else
            result = res;
    }
    resp.json(result);
});
app.listen(3000);
