import { Application, NextFunction, Request, Response, Router } from "express";
import * as createHttpError from "http-errors";
import Participante from "../schemas/participante";


export class ParticipanteController {
    constructor(app: Application) {
        const routePrefix = '/apis/v1/participantes';

        const router = Router();

        // define routes
        router.post("/", this.post);

        app.use(`${routePrefix}`, router);
    }

    async post(req: Request, res: Response, next: NextFunction) {
        const { nome, email } = req.body;

        if (!nome) next(createHttpError(500, 'Nome é obrigatório'));

        const participante = await Participante.create({
            nome: nome,
            email: email,
            itens: []
        });

        res.status(201).json(participante);
    }
}