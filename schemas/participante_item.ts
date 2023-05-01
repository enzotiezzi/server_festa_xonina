import { Document, Model, Schema, model } from "mongoose";
import { IParticipante } from "./participante";
import { IItem } from "./item";

export interface IParticipanteItem extends Document {
    participante: IParticipante;
    item: IItem;
    quantidade: number;
}

const ParticipanteItemSchema = new Schema({
    participante: {
        type: Schema.Types.ObjectId,
        ref: 'Participante',
        required: true
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    quantidade: {
        type: Number,
        required: true,
        default: 0
    }
});

const ParticipanteItem: Model<IParticipanteItem> = model<IParticipanteItem>('ParticipanteItem', ParticipanteItemSchema);

export default ParticipanteItem;