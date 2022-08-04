const express = require('express');

const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

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

    res.json({Spots: allSpots})
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
            // through:{
                
            //     attributes: []
            // }
        }
        ],
        // group:['Spot.id']
            
     });
     
     res.json(spotDetail)
});




// Body validation error 400
const spotValid = [
check('address')
   .exists({ checkFalsy: true })
   .notEmpty()
   .isLength({ min: 1 })
   .withMessage('Street address is required'),
check('city')
   .exists({ checkFalsy: true })
   .notEmpty()
   .isLength({ min: 1 })
   .withMessage('City is required'),
check('state')
   .exists({ checkFalsy: true })
   .notEmpty()
   .isLength({ min: 1 })
   .withMessage('State is required'),
check('country')
   .exists({ checkFalsy: true })
   .notEmpty()
   .isLength({ min: 1 })
   .withMessage('Country is required'),
check('lat')
   .exists({ checkFalsy: true })
   .notEmpty()
   .isFloat({min:-90, max:90})
   .withMessage('Latitude is not valid'),
check('lng')
   .exists({ checkFalsy: true })
   .notEmpty()
   .isFloat({min:-180, max:180})
   .withMessage('Longitude is not valid'),
check('name')
   .exists({ checkFalsy: true })
   .notEmpty()
   .isLength({ min: 1, max:50 })
   .withMessage('Name must be less than 50 characters'),
check('description')
   .exists({ checkFalsy: true })
   .notEmpty()
   .isLength({ min: 1 })
   .withMessage('Description is required'),
check('price')
   .exists({ checkFalsy: true })
   .notEmpty()
   .withMessage('Price per day is required'),
handleValidationErrors
]


// Create a Spot
router.post('/', restoreUser, spotValid, requireAuth, async (req, res, next) => {
   const {address, city, state, country, lat, lng, name, description, price} = req.body

// Body validation error 400

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

    const findSpotId = await Spot.findByPk(spotId)
    
     if(!findSpotId){
        res.statusCode = 404,
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
     }
     
     const addImageToSpot = await Image.create({
        "spotId": spotId,
        "url" : url
     })

     res.json(await Image.findByPk(addImageToSpot.id, {
        attributes: [
            'id',
            ['spotId', 'imageableId'],
            'url'
        ]
    }))
//     const abc =  addImageToSpot.toJSON()
//     abc.imageableId = spotId
// console.log(abc)

//      res.json(abc)
    
   

})






// Edit a Spot

router.put('/:spotId', restoreUser, spotValid, requireAuth, async (req, res, next) => {

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



// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const {spotId} = req.params
    const {user} = req

    const spot = await Spot.findByPk(spotId)
    if(!spot){
       res.statusCode = 404,
       res.json({
           "message": "Spot couldn't be found",
           "statusCode": 404
         })
    }
// console.log('this is spot.owner id', typeof(spot.ownerId))
// console.log ('this is user id', typeof(user.id))

    if(spot.ownerId !== user.id){
        const notOwnerBooking = await Booking.findAll({

            attributes: ['spotId', "startDate", "endDate"],
            where: {
                spotId: spotId
            }
        });
            res.json({Bookings: notOwnerBooking})
    }

    if(spot.ownerId === user.id){
        const ownerBooking = await Booking.findAll({

            where: {
                spotId: spotId
            },
            include:[{
                model: User,
                // as: 'Owner',
                attributes: ['id','firstName', 'lastName'],
                // through:{
                //     attributes: []
                // }
                }
            ]

        });
            res.json({Bookings:ownerBooking})
    }
})


// Create a Booking from a Spot based on the Spot's id

router.post('/:spotId/bookings', restoreUser, requireAuth, async (req, res, next) => {

    const {spotId} = req.params
    const {user} = req
    const {startDate, endDate} = req.body
   

    const findSpotId = await Spot.findByPk(spotId)

     if(!findSpotId){
        res.statusCode = 404,
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
     }
// console.log('this is endDate < startDate: ', endDate < startDate)
    let today = new Date().toISOString().slice(0, 10)

    if(endDate < startDate || startDate < today ||  endDate < today){
        res.statusCode = 400,
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "endDate cannot be on or before startDate"
            }
          })
    }
     
    const startDateConflict = await Booking.findAll({
        where:{
            // startDate: {
            // [Op.and]: [{ [Op.between]: [startDate, endDate] }, { spotId }],   
            // }
            [Op.and]: [
                {startDate},{spotId}
            ]
        },
       
    })
    
// console.log(startDateConflict.length)

    if(startDateConflict.length > 0 ){
        res.statusCode = 403
        res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
              "startDate": "Start date conflicts with an existing booking",
              "endDate": "End date conflicts with an existing booking"
            }
          })
              // Spot must NOT belong to the current user
            
    } else if(findSpotId.ownerId !== user.id){
        const createBooking = await Booking.create({
            "spotId": spotId,
            "userId": user.id,
            startDate, 
            endDate
        })

        res.json(createBooking)

    } else {

        res.statusCode = 403
        res.json({
            "message": "You can't booking your own Spot!!!",
            "statusCode": 403,
          })
    }

    // const endDateConflict = await Booking.findAll({
    //     where:{
    //         [Op.and]: [
    //             {endDate},{spotId}
    //         ]
    //     }
    // })

    // if(endDateConflict){
    //     res.statusCode = 403
    //     res.json({
    //         "message": "Sorry, this spot is already booked for the specified dates",
    //         "statusCode": 403,
    //         "errors": {
    //             "endDate": "End date conflicts with an existing booking"
    //         }
    //       })
    // }
  

     
     
    

 })

module.exports = router;