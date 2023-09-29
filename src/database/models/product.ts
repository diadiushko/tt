import { model, Schema } from 'mongoose';
import { WithIdObject } from '../../types/utils/with-id-object';

export type ProductDocType = WithIdObject<{
    title: string;
    price: number;
    quantity: number;
}>

export const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
});

export const Product = model('Product', productSchema);
