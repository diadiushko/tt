import { HydratedDocument, model, Query, Schema, Types } from 'mongoose';
import { WithIdObject } from '../../types/utils/with-id-object';
import { ProfileDocType } from './profile';
import { updateProductsQuantities } from '../utils/products';
import { BULK_DELETE_OPERATIONS, BULK_UPDATE_OPERATIONS, DELETE_OPERATIONS, UPDATE_OPERATIONS } from '../utils/operations';

export type OrderDocType = WithIdObject<{
    profile_id: string;
    products: Types.DocumentArray<{
        product_id: Types.ObjectId;
        quantity: number;
    }>;
}>

export const orderSchema = new Schema({
    profile_id: {
        type: Types.ObjectId,
        ref: 'Profile',
        index: true,
        required: true,
    },
    products: [
        {
            product_id: {
                type: Types.ObjectId,
                ref: 'Product',
                index: true,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 0,
            },
        },
    ],
});

// Hooks

orderSchema.pre(
    [...UPDATE_OPERATIONS, ...DELETE_OPERATIONS],
    async function () {
        const query = (this as Query<ProfileDocType, HydratedDocument<ProfileDocType>>);
        if (!query?.getFilter?.()) {
            return;
        }
        const order = await Order.findOne(query.getFilter());

        if (!order) {
            return;
        }

        await Promise.all(updateProductsQuantities(order?.products as OrderDocType['products'], true));
    });

orderSchema.post(
    [...UPDATE_OPERATIONS],
    async function (doc) {
        const query = (this as Query<ProfileDocType, HydratedDocument<ProfileDocType>>);
        if (doc?.products) {
            return Promise.all(updateProductsQuantities(doc?.products as OrderDocType['products'], false));
        }
        if (!query.getFilter()) {
            return;
        }
        const order = await Order.findOne(query.getFilter());

        if (!order) {
            return;
        }

        await Promise.all(updateProductsQuantities(order?.products as OrderDocType['products'], false));
    });

orderSchema.pre(
    [...BULK_UPDATE_OPERATIONS, ...BULK_DELETE_OPERATIONS],
    async function () {
        const query = (this as Query<ProfileDocType, HydratedDocument<ProfileDocType>>);
        const orders = await Order.find(query.getFilter());

        if (!orders?.length) {
            return;
        }
        const products = orders.reduce((acc, { products }) => [...acc, ...products], []);

        await Promise.all(updateProductsQuantities(products as OrderDocType['products'], true));
    });

orderSchema.pre(
    [...BULK_UPDATE_OPERATIONS],
    async function () {
        const query = (this as Query<ProfileDocType, HydratedDocument<ProfileDocType>>);
        const orders = await Order.find(query.getFilter());

        if (!orders?.length) {
            return;
        }
        const products = orders.reduce((acc, { products }) => [...acc, ...products], []);

        await Promise.all(updateProductsQuantities(products as OrderDocType['products'], false));
    });

export const Order = model('Order', orderSchema);
