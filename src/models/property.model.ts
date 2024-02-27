import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPropertySchema extends Document {
	_id: string;
	name: string;
	description: string;
	price: number;
	owner: {
		_id: string;
		name: string;
		phone: string;
		whatsapp: string;
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
	find: (query: any) => any;
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
		_id: {
			type: String,
		},
		name: {
			type: String,
		},
		phone: {
			type: String,
		},
		whatsapp: {
			type: String,
		},
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

// add indexes improve the performance of the queries
propertySchema.index({ location: '2dsphere' });
propertySchema.index({ price: 1 });

// pre save middleware to populate owner info before saving
propertySchema.pre('save', async function (next) {
	const owner = await this.model('User').findById(this.owner._id);
	this.owner = {
		_id: owner?._id,
		name: owner?.name,
		phone: owner?.phone,
		whatsapp: owner?.whatsapp,
	};
	next();
});

// *** Query Middleware

// +[1] serve owner info when findOne Property
propertySchema.pre(/^findOne/, function (next) {
	this.populate({
		path: 'owner',
		select: '-__v -passwordChangedAt -role',
	});
	next();
});

// +[2] not serve Property is not approved
// propertySchema.pre(/^find/, function (next) {
// 	this.find({ approved: { $ne: false } });
// 	next();
// });

const Property: Model<IPropertySchema> = mongoose.model('Property', propertySchema);

export default Property;
