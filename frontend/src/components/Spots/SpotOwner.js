import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSpot, getOwnerSpots } from "../../store/spots";


//  console.log("12456879")

const SpotOwner = () => {

    // console.log("beginning")
    const history = useHistory()

    const dispatch = useDispatch();

    const spotObj = useSelector(state => state.spots)
    // console.log("spotObj: ", spotObj)
    const spots = Object.values(spotObj)
    // console.log("spot: ", spots)

    const user = useSelector(state => state.session.user)
    const filter = spots.filter(spot => spot?.ownerId === user?.id)
    // console.log("filter: ", filter)
    // console.log("spots: ", spots)

    useEffect(() => {
        dispatch(getOwnerSpots())
    }, [dispatch])

    if (!user) {
        alert("You need to log in first to manage your spot !")
        history.push("/")
    }

    // if (!filter) return alert("You need to log in first to manage your spot !")
    return filter.length ? (
        <>
            {spots.map(spot =>
                <div className='SpotOwner_Container' key={spot.id}>
                    <div>
                        <NavLink to={`/spots/${spot.id}`}>
                            <img className='SpotOwner_img' src={spot.previewImage} alt="Vacation Property" />
                        </NavLink>
                    </div>
                    <div className='SpotOwner_Second_Container'>
                        <div className='SpotOwner_Price_and_Star'>
                            <div className='SpotOwner_Price'>{`$${spot.price}`} / night</div>
                            <div><i className="fa-solid fa-star"></i> {spot.avgRating ? Number.parseFloat(spot.avgRating).toFixed(2) : 0}</div>
                        </div>
                        <div className='SpotOwner_Name'><i className="fa-solid fa-house"></i>Hotel Name: {spot.name}</div>
                        <div className='SpotOwner_Address'><i className="fa-solid fa-location-dot"></i> Hotel Address: {spot.address}, {spot.city}, {spot.state}, {spot.country}</div>
                        {/* <div>{spot.city}, {spot.state}, {spot.country} </div> */}
                        <div className='SpotOwner_Description'><i className="fa-solid fa-file-lines"></i> Description: {spot.description}</div>
                        <NavLink className="SpotOwner_Link_Edit" to={`/spots/${spot.id}/edit`}><i className="fa-solid fa-pen-to-square"></i> Edit</NavLink>
                        <button className='SpotOwner_Delete_button' onClick={() => dispatch(deleteSpot(spot.id))}> <i className="fa-solid fa-trash-can"></i> Delete</button>
                    </div>
                </div>
            )}
            <footer className='footer_container'>
                <div>
                    © 2022 WonderlandBnB, Inc. · Privacy · Terms · Sitemap
                </div>
                <div>
                    <i className="fa-solid fa-globe"></i> English(US)  $ USD
                </div>
            </footer>

        </>
    ) :
        <>
            <h1 className='no_spot_found'>You currently have no any spot to host !</h1>
            <footer className='footer_container'>
                <div>
                    © 2022 WonderlandBnB, Inc. · Privacy · Terms · Sitemap
                </div>
                <div>
                    <i className="fa-solid fa-globe"></i> English(US)  $ USD
                </div>
            </footer>
        </>
};

export default SpotOwner;