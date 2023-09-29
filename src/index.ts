import mongoose, { Types } from 'mongoose';
import connect from './database/connect';
import { getMongoConnectionURI } from './utils/secrets';
import fillDb, { changeOrderProductQuantity, createOrder, deleteOrder, deleteProfile } from './utils/fill-db';

async function bootstrap(): Promise<void> {
    await connect(mongoose, getMongoConnectionURI());
    mongoose.set('debug', true);

    // uncomment to fill db.
    // await fillDb(3, 10);

    // uncomment and insert a profileId to create an order
    // await createOrder(new Types.ObjectId(''));

    // uncomment and insert an orderId to delete an order
    // await deleteOrder(new Types.ObjectId(''));

    // uncomment and insert a profileId to delete it.
    // await deleteProfile(new Types.ObjectId(''));

    // uncomment and insert orderId, productId and countToAdd to update an order.
    // await changeOrderProductQuantity(new Types.ObjectId(''), new Types.ObjectId(''), -50);
}

bootstrap();
