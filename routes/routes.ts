import { Application } from "express";
import { ItemController } from "../controllers/item_controller";
import * as express from "express";

export class Router {
    static defineRoutes(app: Application, router: express.Router) {
        new ItemController(app, router);
    }
}