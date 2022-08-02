const express = require('express');

const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, User, Review, Booking, Image, sequelize } = require('../../db/models');



// Get all spots
router.get('/', async (req, res, next) => {
   
    const allSpots = await Spot.findAll({
        include: {
            model: Review,
            attributes: []
        },
        attributes: [
            "id",
            "ownerId", 
            "address", 
            "city", 
            "state", 
            "country", 
            "lat",
            "lng",
            "name",
            "description",
            "price",
            "createdAt",
            "updatedAt",
            [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
            "previewImage",
        ]
 
    })
    res.json(allSpots)
});


// Create a Spot
router.post('/', restoreUser, requireAuth, async (req, res, next) => {
   const {address, city, state, country, lat, lng, name, description, price} = req.body


   if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
    res.statusCode = 400;
    res.json({
        "message": "Validation error",
        "statusCode": 400,
        "errors": {
            "address": "Street address is required",
            "city": "City is required",
            "state": "State is required",
            "country": "Country is required",
            "lat": "Latitude is not valid",
            "lng": "Longitude is not valid",
            "name": "Name must be less than 50 characters",
            "description": "Description is required",
            "price": "Price per day is required"
          }
    })
  }


    const spots = await Spot.create({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
    })
    res.statusCode = 201
    res.json(spots)
});






module.exports = router;