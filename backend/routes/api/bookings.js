const express = require('express');

const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const { Spot, User, Review, Booking, Image, sequelize } = require('../../db/models');

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res, next) => {

    const {user} = req
    
    const allBooking = await Booking.findAll({
   
        where: {
            userId: user.id
        },
        include:
            {
                model: Spot,
            }
    })

      res.json({Bookings: allBooking});
})


// Edit a Booking

router.put('/:bookingId', restoreUser, requireAuth, async (req, res, next) => {

    const {startDate, endDate} = req.body
    const {bookingId} = req.params
    const {user} = req
    

    const editBookingId = await Booking.findByPk(bookingId)

    // console.log(editBookingId.userId)
    // console.log(user.id)

    

    if(!editBookingId){  
        res.statusCode = 404,
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    }

    if(editBookingId.userId !== user.id) {
        res.status(403)
        res.json( {
            "message": "You must be the current user!!!",
            "statusCode": 403
        })
    }


  

    if(endDate < startDate || !endDate || !startDate){
        res.statusCode = 400,
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot come before startDate"
            }
        })
    }

    let today = new Date().toISOString().slice(0, 10)

    if(editBookingId.startDate < today ||  editBookingId.endDate < today){
        res.statusCode = 403,
        res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
          })
    }

    let spotId = editBookingId.spotId
    const startDateConflict = await Booking.findAll({
        where:{
            [Op.and]: [
                {startDate},{spotId}
            ]
        },
    })
// console.log('startDateConflict.length: ', startDateConflict.length)

    if(startDateConflict.length > 1){
        res.statusCode = 403
        res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
              "startDate": "Start date conflicts with an existing booking",
              "endDate": "End date conflicts with an existing booking"
            }
          })
              // Booking must belong to the current user
            
    } else if (user.id === editBookingId.userId){

        editBookingId.set({
            startDate, 
            endDate
        })
    
       await editBookingId.save()
    
        return res.json(editBookingId)
        
    }
    
// Delete a Booking

router.delete('/:bookingId', restoreUser, requireAuth, async (req, res, next) => {
    const {bookingId} = req.params
    const {user} = req

    const deleteBooking = await Booking.findByPk(bookingId)
    // console.log(deleteBooking)

    if(!deleteBooking){
        res.statusCode = 404,
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    }

    // let today = new Date().toISOString().slice(0, 10)
    // if(startDate < today ||  endDate < today){
    //     res.statusCode = 403,
    //     res.json({
    //         "message": "Bookings that have been started can't be deleted",
    //         "statusCode": 403
    //       })
    // }

    // const deleteSpotBooking = await Spot.findByPk(deleteBooking.spotId);
     
    // if(deleteBooking.userId === user.id || deleteSpotBooking.ownerId === user.id ) {
        await deleteBooking.destroy()

        res.statusCode = 200
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    // } else {
    //     res.status(403)
    //             return res.json( {
    //                 "message": "Booking must belong to the current user or the Spot must belong to the current user",
    //                 "statusCode": 403
    //             })
    // }
 })
});




module.exports = router;