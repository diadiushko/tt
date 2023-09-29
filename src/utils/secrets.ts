import { configDotenv } from 'dotenv';

configDotenv()

export const MONGODB_PORT = +(process.env.MONGODB_PORT ?? 27017);

export const MONGODB_URI_SCHEME = process.env.MONGODB_URI_SCHEME ?? 'mongodb';

export const MONGODB_HOST = process.env.MONGODB_HOST ?? 'localhost';

export const MONGODB_POOL_SIZE = +(process.env.MONGODB_POOL_SIZE ?? 5);

export const { MONGODB_DATABASE, MONGODB_USER, MONGODB_PASSWORD } = process.env;

export function getMongoConnectionURI(): string {
    if (MONGODB_USER) {
        return`${MONGODB_URI_SCHEME}://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}?retryWrites=true&w=majority&authSource=admin`;
    }
    return `${MONGODB_URI_SCHEME}://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}?retryWrites=true&w=majority`;
}
