import { Types } from 'mongoose';

export type WithIdObject<T> = T & { _id: Types.ObjectId };
