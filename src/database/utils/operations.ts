export const UPDATE_OPERATIONS = ['updateOne', 'save', 'findOneAndUpdate', 'findOneAndReplace', 'replaceOne'] as const;

export const DELETE_OPERATIONS = ['deleteOne', 'findOneAndDelete', 'findOneAndRemove'] as const;

export const BULK_UPDATE_OPERATIONS = ['updateMany'] as const;

export const BULK_DELETE_OPERATIONS = ['deleteMany'] as const;
