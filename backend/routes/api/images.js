const express = require('express');

const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const { Spot, User, Review, Booking, Image, sequelize } = require('../../db/models');


router.delete('/:imageId', restoreUser, requireAuth, async (req, res, next) => {
    const {imageId} = req.params
    const {user} = req

    const deleteImage = await Image.findByPk(imageId)

    if(!deleteImage){
        res.statusCode = 404,
        res.json({
            "message": "Image couldn't be found",
            "statusCode": 404
          })
    }  
    
    if(deleteImage.userId === user.id){
        await deleteImage.destroy()
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    } else {
        res.statusCode = 403
        res.json({
            "message": "Image must belong to the current user",
            "statusCode": 403
        })
    }

})

module.exports = router;