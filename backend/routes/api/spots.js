const express = require('express');

const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const { Spot, User, Review, Booking, Image, sequelize } = require('../../db/models');
// const spot = require('../../db/models/spot');

const checkValidate = [
    check('page')
        .optional()
        .isInt({ min:1 })
        .withMessage('Page must be greater than or equal to 0"'),
    check('size')
        .optional()
        .isInt({ min:0 })
        .withMessage('Size must be greater than or equal to 0'),
    check('maxLat')
        .optional()
        .isDecimal()
        .withMessage('Maximum latitude is invalid'),
    check('minLat')
        .optional()
        .isDecimal()
        .withMessage('Minimum latitude is invalid'),
    check('minLng')
        .optional()
        .isDecimal()
        .withMessage('Maximum longitude is invalid'),
    check('maxLng')
        .optional()
        .isDecimal()
        .withMessage('Minimum longitude is invalid'),
    check('minPrice')
        .optional()
        .isInt({ min:0 })
        .withMessage('Maximum price must be greater than or equal to 0'),
    check('maxPrice')
        .optional()
        .isInt({ min:0 })
        .withMessage('Minimum price must be greater than or equal to 0'),
    handleValidationErrors
]

// Get all spots & Add Query Filters to Get All Spots
router.get('/', checkValidate, async (req, res, next) => {
    let {size, page} = req.query

    if(!page) page = 1
    if(!size) size = 20

    page = parseInt(page);
    size = parseInt(size);

    const pagination = {}

    if(page >= 1 && size >= 1){
        pagination.limit = size
        pagination.offset = size * (page - 1)
      
    }

    const allSpots = await Spot.findAll({
        ...pagination
    })

    // console.log('allSpots.length: ', allSpots.length)

    let spot = []

    for(let el of allSpots){
        const allRating = await Review.findAll({
        where: {
            spotId: el.id
        },
        attributes: [
            [sequelize.fn("AVG", sequelize.col('stars')), "avgRating"]
        ],
        raw: true,
        })
        
        let imageUrl = await Image.findOne({ where: { spotId: el.id }, attributes: ['url'] })
       
    //    console.log('imageUrl.url: ', imageUrl.url)
       if(!imageUrl){
            data = {
                ...el.dataValues,
                avgRating: allRating[0].avgRating,
                previewImage: null
            }
            spot.push(data)
       } else {
            data = {
                ...el.dataValues,
                avgRating: allRating[0].avgRating,
                previewImage: imageUrl.url
            }
            spot.push(data)
       }
        // data = {
        //     ...el.dataValues,
        //     avgRating: allRating[0].avgRating,
        //     previewImage: imageUrl.url
        // }
        // spot.push(data)
    }

    res.json({Spots: spot, page:page, size:size})
});

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    const{user} = req
    const allSpots = await Spot.findAll({
        where: {
            ownerId: user.id
        }
    })

    let spot = []
    for(let el of allSpots){
        const allRating = await Review.findAll({
        where: {
            spotId: el.id
        },
        attributes: [
            [sequelize.fn("AVG", sequelize.col('stars')), "avgRating"]
        ],
        raw: true,
        })
        
        let imageUrl = await Image.findOne({ where: { spotId: el.id }, attributes: ['url'] })
       console.log(allRating)

        data = {
            ...el.dataValues,
            avgRating: allRating[0].avgRating,
            previewImage: imageUrl.url
        }
        spot.push(data)
    }

    res.json({Spots:spot})
});



//Get details of a Spot from an id

router.get('/:spotId', async (req, res, next) => {
     const {spotId} = req.params

     const spotById = await Spot.findByPk(spotId)
     if(!spotById){
        res.statusCode = 404,
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
     }
    //  let image = await Image.findAll({
    //     attributes: [id, ['spotId', 'imageableId'], 'url'],
        // where:{soptId:spot}
    //  })
    //  let spot = []

    const numReviews = await Review.count({
        where: {
          spotId: spotId
        }
      })

        const allRating = await Review.findAll({
            where: {
                spotId
            },
            attributes: [
                [sequelize.fn("AVG", sequelize.col('stars')), "avgRating"]
            ],
        })
    
        let imageUrl = await Image.findOne(
            { where: { spotId }, 
            attributes: ['id',['spotId', 'imageableId'], 'url'] 
        })

        let owner = await User.findByPk(spotById.ownerId, {
                attributes: ['id', 'firstName', 'lastName']
            })

    //    console.log(spotDetail)
//    let avgStarRating = allRating[0].dataValues.avgRating
//    console.log("avgStarRating: ", avgStarRating)
        data = {
            ...spotById.dataValues,
            numReviews,
            avgStarRating: allRating[0].dataValues.avgRating,
            Images: imageUrl,
            Owner: owner
        }

        // spot.push(data)
    

    res.json(data)
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
   const {user} = req
// Body validation error 400

    const spots = await Spot.create({
        ownerId: user.id,
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





// Get all Reviews by a Spot's id

router.get('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const {spotId} = req.params
    const {user} = req

    const reviewSpot = await Spot.findByPk(spotId)

    if(!reviewSpot){
        res.statusCode = 404,
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }

    const allReview = await Review.findAll({
   
        where: {
            spotId: spotId
        },
       
        include:[
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Image,
                attributes: ['id', ['spotId', 'imageableId'] ,'url']
            }
        ]
    })

      res.json({Reviews: allReview});



})
  

const reviewChecker = [
    check('review')
   .exists({ checkFalsy: true })
   .notEmpty()
   .withMessage('Review text is required'),
   check('stars')
   .exists({ checkFalsy: true })
   .notEmpty()
   .isInt({min:1, max: 5})
   .withMessage('Stars must be an integer from 1 to 5'),
   handleValidationErrors
]

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', reviewChecker, restoreUser, requireAuth, async (req, res, next) => {

    const {spotId} = req.params
    const {user} = req
    const {review, stars} = req.body
    

    const newSpotReview = await Spot.findByPk(spotId)

    if(!newSpotReview){
        res.statusCode = 404,
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }

    const reviewConflict = await Review.findAll({
        where:{
            [Op.and]: [
                {userId: user.id}, {spotId: spotId }
            ]
        },
    })
    // const count = await Review.count({ where: {  [Op.and]: [
    //     {userId: user.id}, {spotId: spotId }
    // ] } })

    console.log('reviewConflict: ', reviewConflict.length)

    if(reviewConflict.length >= 1){
        res.statusCode = 403
        return res.json({
            "message": "User already has a review for this spot",
            "statusCode": 403
          })
    }
        const createSpotReview = await Review.create({
            "userId": user.id,
            "spotId": spotId,
            review, 
            stars
        })

        res.json(createSpotReview)
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

    } else if(spot.ownerId === user.id){
        const ownerBooking = await Booking.findAll({

            where: {
                spotId: spotId
            },
            include:[{
                model: User,
                attributes: ['id','firstName', 'lastName'],
                
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
            [Op.and]: [
                {startDate: startDate },{spotId: spotId }
            ]
        },
    })
    
// console.log(startDateConflict.length)

    if(startDateConflict.length >= 1 ){
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
})
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
  

     
     
    

 

module.exports = router;