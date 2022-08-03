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

router.put('/:spotId', restoreUser,spotValid, requireAuth, async (req, res, next) => {

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
   .withMessage('Price per day is required')
handleValidationErrors


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