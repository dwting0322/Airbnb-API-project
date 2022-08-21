import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSpot, getOwnerSpots } from "../../store/spots";


//  console.log("12456879")

const SpotOwner = () => {

    // console.log("beginning")


    const dispatch = useDispatch();

    const spotObj = useSelector(state => state.spots)
    // console.log("spotObj: ", spotObj)
    const spots = Object.values(spotObj)
    console.log("spot: ", spots)

    // const user = useSelector(state => state.session.user)
    // console.log("user: ", user)


    useEffect(() => {
        dispatch(getOwnerSpots())
    }, [dispatch])


    if (!spots) return null
    return (
        <>
            {spots.map(spot =>
                <div key={spot.id}>
                    <NavLink to={`/spots/${spot.id}`}>
                        <img src={spot.previewImage} alt="Vacation Property" />
                    </NavLink>
                    <div>{`$${spot.price.toFixed(2)}`}  night</div>
                    <div><i className="fa-solid fa-star"></i> {spot.avgRating? spot.avgRating.toFixed(2) : 0}</div>
                    <div>{spot.name}</div>
                    <div>{spot.address}</div>
                    <div>{spot.city}, {spot.state}, {spot.country} </div>
                    <div>Description: {spot.description}</div>
                    <NavLink to={`/spots/${spot.id}/edit`}>Edit</NavLink>
                    <button onClick={()=> dispatch(deleteSpot(spot.id))}>Delete</button>
                </div>
            )}
        </>
    )
};

export default SpotOwner;