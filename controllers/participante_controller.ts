import { Application, NextFunction, Request, Response, Router } from "express";
import * as createHttpError from "http-errors";
import Participante from "../schemas/participante";
import ParticipanteItem from "../schemas/participante_item";
import Item from "../schemas/item";

export class ParticipanteController {
    constructor(app: Application) {
        const routePrefix = '/apis/v1/participantes';

        const router = Router();

        // define routes
        router.post("/", this.post);
        router.post("/adicionar-item", this.adicionarItem);
        router.get("/", this.getAll);

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

    async adicionarItem(req: Request, res: Response, next: NextFunction) {
        const { idParticipante, idItem, quantidade } = req.body;

        if (!idParticipante) next(createHttpError(500, 'Participante é obrigatório'));

        if (!idItem) next(createHttpError(500, 'Item é obrigatório'));

        let participanteItem = await ParticipanteItem.findOne({ participante: idParticipante, item: idItem })
            .populate('participante')
            .populate('item');

        if (!participanteItem) {
            participanteItem = await ParticipanteItem.create({
                participante: idParticipante,
                item: idItem,
                quantidade: quantidade
            });
        } else {
            participanteItem.quantidade = quantidade;

            await participanteItem.save();
        }

        res.status(201).json(participanteItem);
    }
    
    async getAll(req: Request, res: Response, next: NextFunction) {
        const participantes = await Participante.find();

        participantes.forEach(async x =>{
            const itens = await ParticipanteItem.find({ participante: x._id })
                .populate('item');
            x.itens = itens.map(x => x.item);
        });

        res.status(200).json(participantes);
    }
}