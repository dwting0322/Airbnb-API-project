const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');




// validateSignup middleware checks to see if req.body.email exists and is an email, 
// req.body.username is a minimum length of 4 and is not an email, 
// and req.body.password is not empty and has a minimum length of 6.

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Invalid email'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters. Username is required'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    check('firstName')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('First Name is required'),
    check('lastName')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Last Name is required'),

    handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;

    const sameEmail = await User.findOne({
        where: { email },
      })

    if(sameEmail){
        res.statusCode = 403
        res.json({
            "message": "User already exists",
            "statusCode": 403,
            "errors": {
              "email": "User with that email already exists"
            }
          })
    }
    
    // const sameUsername = await User.findOne({
    //     where: { username },
    //   })

    // if(sameUsername){
    //     res.statusCode = 403
    //     res.json({
    //         "message": "User already exists",
    //         "statusCode": 403,
    //         "errors": {
    //           "username": "User with that username already exists"
    //         }
    //       })
    // }


    const user = await User.signup({ firstName, lastName, email, username, password });

    const token = await setTokenCookie(res, user)
    console.log(user)
    user.dataValues.token = token
    return res.json(
        user
    )
    // await setTokenCookie(res, user);

    // return res.json({user});
});


module.exports = router;