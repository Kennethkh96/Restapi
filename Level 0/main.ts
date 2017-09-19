import * as Express from 'express';
import * as BodyParser from 'body-parser';

let app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));



app.listen(3000);