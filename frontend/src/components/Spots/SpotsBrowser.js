import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getSpots } from "../../store/spots";


const SpotsBrowser = () => {
    const spotsObj = useSelector((state) => state.spots)
    const spots = Object.values(spotsObj)
    // console.log('spots: ', spots)

    const dispatch = useDispatch();

    // async function load () {
    //    return await dispatch(getSpots());
    // }


    useEffect(() => {
        //load()
        dispatch(getSpots());
    }, [dispatch]);
    


    if (!spots) return null

    return (
        <>
            {spots.map(spot => (
                <div key={spot.id}>
                    {/* {console.log("spot.previewImage: ", spot.previewImage)} */}
                    <NavLink to={`/spots/${spot.id}`}>
                        <img src={spot.previewImage ? spot.previewImage :'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' } alt="Vacation Property"/>
                    </NavLink>
                   <div><i className="fa-solid fa-star"></i> {spot.avgRating ? spot.avgRating.toFixed(2) : 0} </div>
                    
                    <div >{spot.name}</div>
                    <div >{spot.city}, {spot.state} </div>
                    <div >{`$${spot.price}`}  night</div>
                </div> 

              
            ))}
        </>
    );
};

export default SpotsBrowser;