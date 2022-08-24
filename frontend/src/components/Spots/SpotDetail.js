import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneSpots } from '../../store/spots';
import ReviewsSpot from '../Reviews/ReviewsSpot';
import CreateReviewForm from '../Reviews/CreateReviewForm';
import "./Spot.css"



const SpotDetail = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  // console.log("spotId: ", spotId)
  const spot = useSelector(state => state.spots[spotId])
  const review = useSelector(state => state.reviews)
  console.log("review: ", review)
  // const user = useSelector(state=> state.session.user)
  // console.log("user: ", user)

  useEffect(() => {
    dispatch(getOneSpots(spotId))
  }, [dispatch, spotId, review]); // once review change, it re-run the  dispatch(getOneSpots(spotId))

  // console.log(spot)

  if (!spot) return null

  return (
    <div className='SpotDetail_Container'>
      <div className='SpotDetail_img_Container'>
        <img className='SpotDetail_img' src={spot.previewImage} alt="Vacation Property" />
      </div>

      <div className='SpotDetail_Second_Container'>

        <div className='SpotDetail_price'>{`$${spot.price}`}  / night</div>
        <div><i className="fa-solid fa-star"></i> {spot.avgStarRating ? spot.avgStarRating : 0}</div>
        <div>{spot.numReviews} reviews</div>
        <div>Hotel Name: {spot.name}</div>
        <div>Hotel Address: {spot.address}, {spot.city}, {spot.state}, {spot.country} </div>
        {/* <div> </div> */}
        <div>Description: {spot.description}</div>
        <div><ReviewsSpot /></div>
        <div><CreateReviewForm /></div>

        <div className='Things_to_know_words'>Things to know :</div>
        <div className='Things_to_know_container'>
          
          <div className="House_rule_container">
            <div className='House_rule_words'>House rules :</div>
            <div><i class="fa-solid fa-clock"></i> Check-in: After 4:00 PM</div>
            <div><i class="fa-solid fa-clock"></i> Checkout: 11:00 AM</div>
            <div><i class="fa-solid fa-door-open"></i> Self check-in with keypad</div>
            <div className='No_Smoking'><i class="fa-solid fa-ban-smoking"> </i> No smoking</div>
            <div><i class="fa-solid fa-users-slash"></i> No parties or events</div>
            <div><i class="fa-solid fa-paw"></i> Pets are allowed</div>
          </div>

          <div className="Health_safety_container">
            <div className='House_rule_words'>Health & safety :</div>
            <div><i class="fa-solid fa-viruses"></i> Airbnb's COVID-19 safety practices apply</div>
            <div><i class="fa-solid fa-circle-exclamation"></i> Security camera/recording device</div>
            <div><i class="fa-solid fa-circle-exclamation"></i> Pool/hot tub without a gate or lock</div>
            <div><i class="fa-solid fa-smog"></i> Carbon monoxide alarm</div>
            <div><i class="fa-solid fa-volcano"></i> Smoke alarm</div>
          </div>
          <div className="Cancellation_policy_container">
            <div className='House_rule_words'>Cancellation policy :</div>
            <div>Free cancellation for 48 hours.</div>
            <div>Review the Host's full cancellation policy which</div>
            <div>applies even if you cancel for illness or disruptions</div>
            <div>caused by COVID-19.</div>
          </div>
        </div>
      </div>
    </div>

  )

};

export default SpotDetail;