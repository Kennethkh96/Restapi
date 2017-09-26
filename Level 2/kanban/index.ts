import * as Express from 'express';
import * as BodyParser from 'body-parser';
import * as HTTP from 'http-status-codes';
import * as Fs from 'fs';

let app = Express();
/*
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});*/     

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

let board = Fs.readFileSync("board.txt").toString();

app.get("/", (req, resp) => {
    resp.status(HTTP.OK).sendFile(__dirname + "/index.html");
});

app.get("/kanban/api", (req, resp) => {
    resp.status(HTTP.OK).send(board);
});

app.post("/kanban/api", (req, resp) => {
    board = req.body;

    Fs.writeFileSync("board.txt", JSON.stringify(board));
    resp.status(HTTP.NO_CONTENT).send();
});

app.options("*", (req, resp) => {
    resp.status(HTTP.OK).send("*");
});

app.listen(3000);
console.log("listening on 3000...");