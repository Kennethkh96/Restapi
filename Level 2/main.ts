import * as Express from 'express';
import * as BodyParser from 'body-parser';
import * as HTTP from 'http-status-codes';

let app = Express();
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));

let quotes: any[] = [
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

app.post("/api/quotes/create", (req, resp) => {
    quotes.push({
        Title: req.body.title,
        Desc: req.body.description,
        votes: 0,
        date: new Date()
    });

    resp.status(HTTP.CREATED).send();
});
app.delete("/api/quotes/:id/delete", (req, resp) => {
    let id = req.params.id;

    quotes.splice(id, 1);

    resp.status(HTTP.NO_CONTENT).send();

});
app.put("/api/quotes/:id/update", (req, resp) => {
    let id = req.params.id;
    quotes[id].Title = req.body.title;
    quotes[id].Desc = req.body.description;

    resp.status(HTTP.NO_CONTENT).send();
});
app.post("/api/quotes/:id/upvote", (req, resp) => {
    let id = req.params.id;
    quotes[id].votes += 1;

    resp.status(HTTP.NO_CONTENT).send();
});

app.post("/api/quotes/:id/downvote", (req, resp) => {
    let id = req.body.id;
    quotes[id].votes -= 1;

    resp.status(HTTP.NO_CONTENT).send();
});

app.get("/api/quotes/newest", (req, resp) => {
    let result;

    quotes.sort((a,b) => a.date - b.date);

    if (quotes.length > 10) 
        result = quotes.slice(quotes.length - 10, quotes.length);
    else
        result = quotes

    resp.status(HTTP.OK).json(result);
});

app.get("/api/quotes/toprated", (req, resp) => {
    let result;
    quotes.sort((a, b) => b.votes > a.votes ? 1 : -1);
    result = quotes.slice(0, 10);

    resp.status(HTTP.OK).json(result);
});

app.options("*", (req, resp) => {
    resp.status(HTTP.OK).json("*");
});


app.listen(3000);