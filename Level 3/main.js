"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var BodyParser = require("body-parser");
var HTTP = require("http-status-codes");
var hal_1 = require("hal");
var APPNAME = "http://localhost:3000";
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
app.get("/api", function (req, resp) {
    var result = new hal_1.Resource({}, "/api");
    result.link("doc:Read", APPNAME + "/api/quotes/read");
    result.link("doc:Create", APPNAME + "/api/quotes/create");
    result.link("doc:Delete", { href: APPNAME + "/api/quotes/{rel}/delete", templated: true });
    result.link("doc:Update", { href: APPNAME + "/api/quotes/{rel}/update", templated: true });
    result.link("Upvote quote", { href: APPNAME + "/api/quotes/{rel}/upvote", templated: true });
    result.link("Downvote quote", { href: APPNAME + "/api/quotes/{rel}/downvote", templated: true });
    result.link("Newest quotes", APPNAME + "/api/quotes/newest");
    result.link("Top rated quotes", APPNAME + "/api/quotes/toprated");
    result.link("curie", { href: APPNAME + "/docs/quotes/{rel}", templated: true, name: "doc" });
    resp.status(HTTP.OK).json(result);
});
app.get("/api/quotes/read", function (req, resp) {
    var result = new hal_1.Resource({}, "/api/quotes/read");
    for (var index = 0; index < quotes.length; index++) {
        var element = quotes[index];
        //let res = new Resource(element.Title, "/api/quotes/" + index);
        //result.embed(element.Title, res);
        result.link(element.Title, { href: APPNAME + "/api/quotes/" + index });
    }
    resp.status(HTTP.OK).json(result);
});
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
    resp.status(HTTP.OK).send();
});
app.put("/api/quotes/:id/update", function (req, resp) {
    var id = req.params.id;
    quotes[id].Title = req.body.title;
    quotes[id].Desc = req.body.description;
    resp.status(HTTP.NO_CONTENT).send();
});
app.put("/api/quotes/:id/upvote", function (req, resp) {
    var id = req.params.id;
    quotes[id].votes += 1;
    resp.status(HTTP.NO_CONTENT).send();
});
app.put("/api/quotes/:id/downvote", function (req, resp) {
    var id = req.body.id;
    quotes[id].votes -= 1;
    resp.status(HTTP.NO_CONTENT).send();
});
app.get("/api/quotes/newest", function (req, resp) {
    var result = new hal_1.Resource({}, APPNAME + "/api/quotes/newest");
    var buffer;
    //quotes.sort((a,b) => a.date - b.date);
    if (quotes.length > 10)
        buffer = quotes.slice(quotes.length - 10, quotes.length);
    else
        buffer = quotes.slice(0);
    buffer.sort(function (a, b) { return a.date - b.date; });
    for (var index = 0; index < buffer.length; index++) {
        var elem = buffer[index];
        result.link(elem.Title, APPNAME + "/api/quotes/" + quotes.indexOf(elem));
    }
    resp.status(HTTP.OK).json(result);
});
app.get("/api/quotes/toprated", function (req, resp) {
    var result = new hal_1.Resource({}, APPNAME + "/api/quotes/toprated");
    quotes.sort(function (a, b) { return b.votes > a.votes ? 1 : -1; });
    var buffer = quotes.slice(0, 10);
    for (var index = 0; index < buffer.length; index++) {
        var elem = buffer[index];
        result.link(elem.Title, APPNAME + "api/quotes/" + index);
    }
    resp.status(HTTP.OK).json(result);
});
app.get("/api/quotes/:id", function (req, resp) {
    var id = req.params.id;
    var q = quotes[id];
    var result = new hal_1.Resource(q, APPNAME + "/api/quotes/" + id);
    result.link("update", APPNAME + "/api/quotes/" + id + "/update");
    result.link("delete", APPNAME + "/api/quotes/" + id + "/delete");
    resp.status(HTTP.OK).json(result);
});
app.options("*", function (req, resp) {
    resp.status(HTTP.OK).json("*");
});
app.get("/docs/quotes/create", function (req, resp) {
    resp.send("Du skal sende et object der har title, og descript, i json format, med et POST request.");
});
app.get("/docs/quotes/delete", function (req, resp) {
    resp.send("Du skal sende et id, i json format, med et DELETE request.");
});
app.get("/docs/quotes/update", function (req, resp) {
    resp.send("Du skal sende et object der har title, og descript samt etid, i json format, med et PUT request.");
});
app.get("/docs/quotes/read", function (req, resp) {
    resp.send("Du skal sende et get request");
});
app.listen(3000);
console.log("listening on port 3000...");
