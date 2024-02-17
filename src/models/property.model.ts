import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPropertySchema extends Document {
	_id: string;
	name: string;
	description: string;
	price: number;
	owner: {
		type: mongoose.Schema.Types.ObjectId;
		ref: string;
	};
	address: string;
	images: [string];
	contract: string;
	approved: boolean;
	location: {
		type: string;
		coordinates: [number];
		address: string;
		description: string;
	};
}

const propertySchema: Schema<IPropertySchema> = new Schema({
	name: {
		type: String,
		required: [true, 'The Property must has a name'],
		trim: true,
		maxlength: [255, 'The name must be at least 255 characters'],
	},
	description: {
		type: String,
		required: [true, 'The Property must has a description'],
		trim: true,
	},
	price: {
		type: Number,
		required: [true, 'The Property must has a price'],
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	address: {
		type: String,
		required: [true, 'The Property must has a address'],
	},
	images: [String],
	contract: {
		type: String,
		required: [true, 'You must provide a contract'],
	},
	approved: {
		type: Boolean,
		default: false,
	},
	location: {
		type: {
			type: String,
			default: 'Point',
			enum: ['Point'],
		},
		coordinates: [Number],
		address: String,
		description: String,
	},
});

const User: Model<IPropertySchema> = mongoose.model('Property', propertySchema);

export default User;
