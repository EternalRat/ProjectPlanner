import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import routes from './versions';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import JWT from './class/jwt.class';
import syncDB from './utils/sync.db';

app.use(
    cors({
        origin: '*',
    }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser('secretcode'));
app.use(passport.initialize());

passport.use(JWT.jwtAuth);

app.use('/api', routes);

app.listen(8080, async () => {
    console.info('app listening on port 8080');
    await syncDB();
});
