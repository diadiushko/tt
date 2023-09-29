declare namespace NodeJS {
    interface ProcessEnv {
        MONGODB_PORT: string;
        MONGODB_URI_SCHEME: string;
        MONGODB_HOST: string;
        MONGODB_DATABASE: string;
        MONGODB_USER: string;
        MONGODB_PASSWORD: string;
        MONGODB_POOL_SIZE: string;
    }
}
