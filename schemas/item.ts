import { model, Model, Schema, Document } from "mongoose";

export interface IItem extends Document {
    imagem: string,
    nome: string
}

const ItemSchema = new Schema({
    imagem: {
        type: String,
        required: true,
        maxlength: 2048
    },
    nome: {
        type: String,
        required: true,
        maxlength: 256
    }
});

const Item: Model<IItem> = model("Item", ItemSchema);

export default Item;