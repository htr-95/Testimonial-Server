const Testimonial = require('../model/testimonial.model');

const getAlltestimonials = async (req, res, next) => {
    try {
        const response = await Testimonial.find({ active: false }, { _id: 0, name: 1, photo: 1, testimonialId: 1, testimonialDescription: 1 });
        if (!response || !response.length) return res.status(404).send('Testimonial not found');
        return res.status(200).send(response);
    }
    catch (err) {
        next(err);
    }

}

const getTestimonialById = async (req, res, next) => {
    try {
        if (!req.params?.testimonialId) return res.status(400).send('testimonialId is missing');
        const response = await Testimonial.findOne({ _id: req.params?.testimonialId, active: false }, { _id: 0, name: 1, photo: 1, testimonialId: 1, testimonialDescription: 1 });
        if (!response) return res.status(404).send('Testimonial record not found for id: ' + req.params?.testimonialId);
        return res.status(200).send(response);
    }
    catch (err) {
        next(err);

    }
}


const createTestimonial = async (req, res, next) => {
    try {
        let name, testimonialDescription, photo;

        if (!req?.files) throw new Error('Bad request');
        if (!req.body?.name) throw new Error('Bad request');
        if (!req.body?.testimonialDescription) throw new Error('Bad request');

        photo = {
            data: req.files[0].buffer,
            contentType: req.files[0].mimetype,
            name: req.files[0].originalname
        }
        name = req.body?.name
        testimonialDescription = req.body?.testimonialDescription

        const newTestimonal = new Testimonial({
            name, testimonialDescription, photo
        });

        newTestimonal.testimonialId = newTestimonal.get('_id');
        await newTestimonal.save();
        res.status(201).send('Testimonial Created');
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

const updateTestimonial = async (req, res) => {
    try {
        const update = {};

        if (!req.params?.testimonialId) return res.status(400).send('testimonialId is missing');

        if (req?.files && req?.files.length)
            update.photo = {
                data: req.files[0].buffer,
                contentType: req.files[0].mimetype,
                name: req.files[0].originalname
            }
        if (req.body?.name)
            update.name = req.body?.name

        if (req.body?.testimonialDescription)
            update.testimonialDescription = req.body?.testimonialDescriptio

        if (!Object.keys(update).length) return res.status(400).send('Bad request, nothing to update');

        await Testimonial.findByIdAndUpdate(req.params?.testimonialId, { ...update, updatedOn: Date.now() });
        res.status(201).send('Testimonial Updated');
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

const deleteTestimonialById = async (req, res, next) => {
    try {
        if (!req.params?.testimonialId) return res.status(400).send('testimonialId is missing');
        await Testimonial.findByIdAndUpdate(req.params?.testimonialId, { active: true, updatedOn: Date.now() });
        return res.status(200).send("Testimonial Delete Successful");
    }
    catch (err) {
        next(err);
    }
}

module.exports = { getTestimonialById, getAlltestimonials, createTestimonial, updateTestimonial, deleteTestimonialById }