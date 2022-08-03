const express = require('express');

const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, User, Review, Booking, Image, sequelize } = require('../../db/models');



// Get all spots
router.get('/', async (req, res, next) => {
  
    const allSpots = await Spot.findAll({
        
        attributes: {
            include:  [
               [ sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating" ],
               [sequelize.literal("Images.url"), "previewImage"]
            ],
        },
        include: [{
            model: Review,
            attributes: []
        },
        {
            model: Image,
            attributes: []
        }
        ],
        group:['Spot.id']
 
    })

    res.json(allSpots)
});

// Get all Spots owned by the Current User

router.get('/current', requireAuth, async (req, res, next) => {
    const{user} = req
    const allSpots = await Spot.findAll({
        where: {
            ownerId: user.id
        },
        attributes: {
            include:  [
               [ sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating" ],
               [sequelize.literal("Images.url"), "previewImage"]
            ],
            
        },
        include: [{
            model: Review,
            attributes: []
        },
        {
            model: Image,
            attributes: []
        }
        ],
        group:['Spot.id']
 
    })

    res.json({Spots:allSpots})
});



//Get details of a Spot from an id

router.get('/:spotId', async (req, res, next) => {
     const {spotId} = req.params

     const sameId = await Spot.findByPk(spotId)
     if(!sameId){
        res.statusCode = 404,
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
     }

     const spotDetail = await Spot.findByPk(spotId, {
        attributes: {
            include:  [
               [ sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating" ],
               [ sequelize.literal("Images.url"), "previewImage" ]
            ],
        },
        include: [{
            model: Review,
            attributes: []
        },
        {
            model: Image,
            attributes: ['id', [ sequelize.literal("Images.id"), "imageableId" ] ,'url']
            
        },
        {
            model: User,
            as: 'Owner',
            attributes: ['id','firstName', 'lastName'],
            through:{
                attributes: []
            }
        }
        ],
        // group:['Spot.id']
       
            // include:{
            //     model: Image,
            //     attributes: ['id','imageableId', 'url'],
            //     include:{
            //         model: User,
            //         attributes: ['id','firstName', 'lastName'],
            //     }
            // },
            
     });
     
     res.json(spotDetail)
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

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', restoreUser, requireAuth, async (req, res, next) => {
    const {spotId} = req.params
  
    const {url} = req.body
    const findId = await Spot.findByPk(spotId, {
        attributes: [],
        include: 
            {
                model: Image,
                attributes: ['id', [ sequelize.literal("Images.id"), "imageableId" ] ,'url']
            },
            
    })
        findId.Images.url = url
        res.json(findId)
    
    //  if(!findId){
    //     res.statusCode = 404,
    //     res.json({
    //         "message": "Spot couldn't be found",
    //         "statusCode": 404
    //       })
    //  }
    
   

})






// Edit a Spot

router.put('/:spotId', restoreUser, requireAuth, async (req, res, next) => {

    const {address, city, state, country, lat, lng, name, description, price} = req.body
    const {spotId} = req.params

    const editSpot = await Spot.findByPk(spotId)


    if(!editSpot){  // Couldn't find a Spot with the specified id
        res.statusCode = 404,
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }
// Body validation error 400
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

    editSpot.set({
        address, 
        city, 
        state, 
        country, 
        lat, 
        lng, 
        name, 
        description, 
        price
    })

   await editSpot.save()

    res.json(editSpot)
});

router.delete('/:spotId', restoreUser, requireAuth, async (req, res, next) => {
    const {spotId} = req.params

    const deleteSpot = await Spot.findByPk(spotId)

    if(!deleteSpot){
        res.statusCode = 404,
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }

    await deleteSpot.destroy()
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })

})


module.exports = router;