const express = require('express');

const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const { Spot, User, Review, Booking, Image, sequelize } = require('../../db/models');


router.get('/current', requireAuth, async (req, res, next) => {

    const {user} = req
    
    const allReview = await Review.findAll({
   
        where: {
            userId: user.id
        },
        include:[
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {exclude: ['createdAt', 'updatedAt']},
               
            },
            {
                model: Image,
                attributes: ['id', [ "id", "imageableId" ] ,'url']
            }
        ]
    })

      res.json({Reviews: allReview});
})


// Add an Image to a Review based on the Review's id

router.post('/:reviewId/images', restoreUser, requireAuth, async (req, res, next) => {

    const {reviewId} = req.params
    const {user} = req
    const {url, previewImage} = req.body
  

    const newReview = await Review.findByPk(reviewId)

    if(!newReview){
        res.statusCode = 404,
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }
    // console.log(user.id)
    // console.log(newImageReview.userId)

    if(user.id !== newReview.userId) {
        res.status(403)
        res.json({
            "message": "You must be the current user.",
            "statusCode": 403
          })
    } else {

        const count = await Image.count({ where: { reviewId } })
   
        if(count > 10){
            res.statusCode = 403,
            res.json({
                "message": "Maximum number of images for this resource was reached",
                "statusCode": 403      
            })
        }

        const newImageToReview = await Image.create({
            "reviewId": reviewId,
            "url" : url,
        })
        // res.json(newImageToReview)

        

        res.json(await Image.findByPk(newImageToReview.id, {
            attributes: [
                'id',
                ['reviewId', 'imageableId'],
                'url'
            ]
        })) 
    }

   

})


// Edit a Review
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

router.put('/:reviewId', reviewChecker, restoreUser, requireAuth, async (req, res, next) => {

    const {review, stars} = req.body
    const {reviewId} = req.params
    const {user} = req

    const editReview = await Review.findByPk(reviewId)


    if(!editReview){  // Couldn't find a Spot with the specified id
        res.statusCode = 404,
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }

    if(editReview.userId !== user.id){
        res.statusCode = 403
        res.json({
            "message": "Review must belong to the current user",
            "statusCode": 403
          })
    }
    

    editReview.set({
        review, 
        stars
    })

   await editReview.save()

    res.json(editReview)
});



router.delete('/:reviewId', restoreUser, requireAuth, async (req, res, next) => {
    const {reviewId} = req.params
    const {user} = req

    const deleteReview = await Review.findByPk(reviewId)

    if(!deleteReview){
        res.statusCode = 404,
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }
    if (deleteReview.userId === user.id){

        await deleteReview.destroy()
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    } else {
        res.statusCode = 403
        res.json({
            "message": "Review must belong to the current user",
            "statusCode": 403
          })
    }
})







module.exports = router;