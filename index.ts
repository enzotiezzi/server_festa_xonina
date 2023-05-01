import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import { Router } from './routes/routes';

const app = express();

const port = process.env.PORT || 5050;
const connectionString = process.env.CONNECTIONSTRING || "mongodb+srv://zymbar_dev:HdmSh7WwPXEF3ojB@zymbar.utmygv4.mongodb.net/test";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

Router.defineRoutes(app);

mongoose
    .connect(connectionString)
    .then(() => {
        app.listen(port, () => {
            console.log("Servidor está UP");
        });
    });
