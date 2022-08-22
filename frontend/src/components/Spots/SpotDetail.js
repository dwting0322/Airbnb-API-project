import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneSpots } from '../../store/spots';
import ReviewsSpot from '../Reviews/ReviewsSpot';
import CreateReviewForm from '../Reviews/CreateReviewForm';




const SpotDetail = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    // console.log("spotId: ", spotId)
    const spot = useSelector(state => state.spots[spotId])
    // console.log("spot: ", spot)
    // const user = useSelector(state=> state.session.user)
    // console.log("user: ", user)

  useEffect(() => {
    dispatch(getOneSpots(spotId))
  }, [dispatch, spotId]);

// console.log(spot)

  if (!spot) return null
  
  return (
    <div>
        <NavLink to={`/spots/${spot.id}`}>
            <img src={spot.previewImage} alt="Vacation Property"/>
        </NavLink>
        <div>{`$${spot.price}`}  night</div>
        <div><i className="fa-solid fa-star"></i> {spot.avgStarRating? spot.avgStarRating.toFixed(2) : 0}</div>
        <div>{spot.numReviews} reviews</div>
        <div>{spot.name}</div>
        <div>{spot.address}</div>
        <div>{spot.city}, {spot.state}, {spot.country} </div>
        <div>Description: {spot.description}</div>
        <div><ReviewsSpot /></div>
        <div><CreateReviewForm /></div>
    </div>

  )

};

export default SpotDetail;