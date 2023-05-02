import { model, Model, Schema, Document } from "mongoose";
import { IItem } from "./item";
import { IParticipanteItem } from "./participante_item";

export interface IParticipante extends Document {
    nome: string;
    email: string;
    itens: IParticipanteItem[];
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
    },
    itens: [{
        type: Schema.Types.ObjectId,
        ref: 'ParticipanteItem'
    }]
});

const Participante: Model<IParticipante> = model<IParticipante>('Participante', ParticipanteSchema);

export default Participante;