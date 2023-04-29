import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import {Router} from './routes/routes';
import { DbConfig } from './config/db';

const app = express();
const router = express.Router();

const port = process.env.PORT || 5050;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

Router.defineRoutes(app, router);

mongoose
    .connect(DbConfig.connectionString)
    .then(_ => {
        app.listen(port, () => {
            console.log("Servidor está UP");
        });
    });
