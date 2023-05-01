import { Application } from "express";
import { ItemController } from "../controllers/item_controller";
import * as express from "express";
import { ParticipanteController } from "../controllers/participante_controller";

export class Router {
    static defineRoutes(app: Application) {
        new ItemController(app);
        new ParticipanteController(app);
    }
}