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
            },
            {
                model: Image,
                attributes: ['id', [ sequelize.literal("Images.id"), "imageableId" ] ,'url']
            }
        ]
    })

      res.json({Reviews: allReview});
})


module.exports = router;