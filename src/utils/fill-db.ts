import { Profile } from '../database/models/profile';
import { Product } from '../database/models/product';
import logger from './logger';
import { Order } from '../database/models/order';
import { Types } from 'mongoose';

const randomString = () => Math.random().toString(16).slice(2);

const randomNumber = (max = 1000) => Math.round(Math.random() * max);

const createRandomProfile = async () => {
    const { first_name, last_name, email } = await Profile.create({
        first_name: randomString(),
        last_name: randomString(),
        email: randomString() + '@' + randomString(),
    });
    logger.info(`A profile was created ${first_name} ${last_name} / ${email}`);
};

const createRandomProduct = async () => {
    const { title } = await Product.create({
        title: randomString(),
        quantity: randomNumber(),
        price: randomNumber(),
    });
    logger.info(`A product was created ${title}`);
};

export default (profilesCount: number, productsCount: number) => {
    return Promise.all([
        ...Array.from({ length: profilesCount }).map(() => createRandomProfile()),
        ...Array.from({ length: productsCount }).map(() => createRandomProduct()),
    ]);
}

export const createOrder = async (profileId: Types.ObjectId) => {
    const products = await Product.find({}, {}, { limit: 5 });
    await Order.create({
        profile_id: profileId,
        products: products.map(({ _id, quantity }) => {
            return {
                product_id: _id,
                quantity: randomNumber(quantity),
            };
        }),
    });
    logger.info(`An order was created list is ${products.map(({ title }) => title)} for user ${profileId}`);
};

export const deleteOrder = async (orderId: Types.ObjectId) => {
    await Order.findByIdAndRemove(orderId);
    logger.info(`An order was removed ${orderId}`);
};

export const deleteProfile = async (profileId: Types.ObjectId) => {
    await Profile.findByIdAndRemove(profileId);
    logger.info(`A user was removed ${profileId}`);
};

export const changeOrderProductQuantity = async (orderId: Types.ObjectId, productId: Types.ObjectId, countToAdd: number) => {
    await Order.updateOne({
        _id: orderId,
        'products.product_id': productId,
    }, { $inc: { 'products.$.quantity': countToAdd } });
    logger.info(`Product ${productId} count was updated by ${countToAdd} on an order ${orderId}`);
};
