import * as Express from 'express';
import * as BodyParser from 'body-parser';

let app = Express();
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
    let result;
        quotes.push({
            Title: req.body.title,
            Desc: req.body.description,
            votes: 0,
            date: new Date()
        });
        
        result = quotes;
    resp.json(result);
});

app.post("/api/quotes/:id/upvote", (req, resp) => {
    let id = req.params.id;
    quotes[id].votes += 1;

    resp.json("Upvoted quote: " + id);
});

app.post("/api/quotes/:id/downvote", (req, resp) => {
    let id = req.body.id;
    quotes[id].votes -= 1;

    resp.json("Upvoted quote: " + id);
});

app.post("/api/quotes/newest", (req, resp) => {
    let result;

    quotes.sort((a,b) => a.date - b.date);

    if (quotes.length > 10) 
        result = quotes.slice(quotes.length - 10, quotes.length);
    else
        result = quotes

    resp.json(result);
});

app.post("/api/quotes/toprated", (req, resp) => {
    let result;
    quotes.sort((a, b) => b.votes > a.votes ? 1 : -1);

    if (quotes.length > 10) 
        result = quotes.slice(0, 10);
    else
        result = quotes;

    resp.json(result);
});


app.listen(3000);