import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneSpots } from '../../store/spots';



const SpotDetail = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    // console.log("spotId: ", spotId)
    const spot = useSelector(state => state.spots[spotId])
    console.log("spot: ", spot)
    const user = useSelector(state=> state.session.user)
    // console.log("user: ", user)

  useEffect(() => {
    dispatch(getOneSpots(spotId))
  }, [dispatch, spotId]);



  if (!spot) return null
  
  return (
    <div>
        <NavLink to={`/spots/${spot.id}`}>
            <img src={spot.Images? spot.Images.url : ""} alt="Vacation Property"/>
        </NavLink>
        <div>{`$${spot.price.toFixed(2)}`}  night</div>
        <div><i className="fa-solid fa-star"></i> {spot.avgStarRating? spot.avgStarRating.toFixed(2) : 0}</div>
        <div>{spot.numReviews} reviews</div>
        <div>{spot.name}</div>
        <div>{spot.address}</div>
        <div>{spot.city}, {spot.state}, {spot.country} </div>
        <div>Description: {spot.description}</div>
        {/* <div><ReviewSpot/></div>
        <div>{ user&& <ReviewForm/>}</div> */}
    </div>

  )

};

export default SpotDetail;