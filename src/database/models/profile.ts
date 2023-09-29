import { HydratedDocument, model, Query, Schema } from 'mongoose';
import { WithIdObject } from '../../types/utils/with-id-object';
import { Order } from './order';
import { DELETE_OPERATIONS } from '../utils/operations';

export type ProfileDocType = WithIdObject<{
    first_name: string;
    last_name: string;
    email: string;
}>

export const profileSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
});

// Hooks

profileSchema.pre([...DELETE_OPERATIONS], async function () {
    const query = (this as Query<ProfileDocType, HydratedDocument<ProfileDocType>>);
    const user = await Profile.findOne(query.getFilter());
    await Order.deleteMany({ profile_id: user._id });
});

export const Profile = model('Profile', profileSchema);
