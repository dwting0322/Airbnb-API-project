import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getSpots } from "../../store/spots";




const SpotsBrowser = () => {
    const spotsObj = useSelector((state) => state.spots)
    const spots = Object.values(spotsObj)
    // console.log('spots: ', spots)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);



    if (!spots) return null

    return (
        <>
            {spots.map(spot => (
                <div key={spot.id}>
                    
                    <NavLink to={`/spots/${spot.id}`}>
                        <img src={spot.previewImage} alt="Vacation Property"/>
                    </NavLink>
                   <div><i className="fa-solid fa-star"></i> {spot.avgRating ? spot.avgRating.toFixed(2) : 0} </div>
                    
                    <div >{spot.name}</div>
                    <div >{spot.city}, {spot.state} </div>
                    <div >{`$${spot.price.toFixed(2)}`}  night</div>
                </div> 

              
            ))}
        </>
    );
};

export default SpotsBrowser;