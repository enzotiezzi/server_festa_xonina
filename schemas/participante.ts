import { model, Model, Schema, Document } from "mongoose";
import { IItem } from "./item";

export interface IParticipante extends Document {
    nome: string;
    email: string;
    itens: IItem[];
}

const ParticipanteSchema = new Schema({
    nome: {
        type: String,
        required: true,
        maxlength: 128
    },
    email: {
        type: String,
        maxlength: 256
    }
});

const Participante: Model<IParticipante> = model<IParticipante>('Participante', ParticipanteSchema);

export default Participante;