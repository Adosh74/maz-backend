import mongoose, { Schema, Document } from 'mongoose';

export interface IApprovedProp extends Document {
	lawyer: string;
	property: string;
}

const ApprovedPropSchema = new Schema<IApprovedProp>({
	lawyer: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	property: {
		type: Schema.Types.ObjectId,
		ref: 'Property',
		required: true,
	},
});

const ApprovedProp = mongoose.model<IApprovedProp>('ApprovedProp', ApprovedPropSchema);

export default ApprovedProp;
