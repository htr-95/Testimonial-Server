const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const TestimonialSchema = new Schema({
    testimonialId: { type: Schema.Types.ObjectId },
    photo: {
        data: Buffer,
        contentType: String
    },
    name: String,
    testimonialDescription: { type: String },
    createdOn: { type: Date, default: Date.now() },
    updatedOn: { type: Date },
    active: { type: Boolean, default: false }
}, {
    timestamps: true
})

module.exports = mongoose.model('Testimonial', TestimonialSchema, 'testimonials');
