import { Mongoose } from 'mongoose';
import { MONGODB_POOL_SIZE } from '../utils/secrets';
import logger from '../utils/logger';

export default async (mongoose: Mongoose, connectionUri: string) => {
    try {
        await mongoose.connect(connectionUri, {
            autoIndex: true,
            maxPoolSize: MONGODB_POOL_SIZE,
        });
        logger.info('Connected to MongoDB');
    } catch (e) {
        const message = 'MongoDB connection error. Please make sure MongoDB is running and mongodb env configuration valid.';
        logger.error(message, e);
    }
};
