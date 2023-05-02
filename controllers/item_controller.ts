import { Request, Response, NextFunction, Application, Router } from "express"
import Item from "../schemas/item"
import * as createHttpError from "http-errors";
import ParticipanteItem from "../schemas/participante_item";
import * as mongoose from 'mongoose';

export class ItemController {
    constructor(app: Application) {
        const routePrefix = "/apis/v1/itens";

        const router = Router();

        router.get("/", this.get);
        router.post("/", this.post);
        router.get("/:id/quantidade", this.getQuantidade);

        app.use(routePrefix, router);
    }

    async get(req: Request, res: Response, next: NextFunction) {
        const itens = await Item.find();

        res.status(200).json(itens);
    }

    async post(req: Request, res: Response, next: NextFunction) {
        const { nome, imagem } = req.body;

        if (!nome || !imagem) next(createHttpError(500, "Nome e imagem são obrigatórios"));

        const item = await Item.create({
            nome: nome,
            imagem: imagem
        });

        return res.status(201).json(item);
    }

    async getQuantidade(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const group = await ParticipanteItem.aggregate([
            { $match: { 'item': mongoose.Types.ObjectId(id) } },
            { $group: { _id: '$item', total: { $sum: '$quantidade' } } }
        ]).exec();

        res.status(200).json(group);
    }
}