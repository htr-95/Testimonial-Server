const express = require('express');
const formData = require('multer');
const { createTestimonial, updateTestimonial, getTestimonialById, deleteTestimonialById, getAlltestimonials } = require('../controller/testimonal.controller');

const router = express.Router();


router.route('/')
    .get(getAlltestimonials)
    .post(formData().any(), createTestimonial)


router.route('/:testimonialId')
    .get(getTestimonialById)
    .put(formData().any(), updateTestimonial)
    .delete(deleteTestimonialById);

module.exports = router;