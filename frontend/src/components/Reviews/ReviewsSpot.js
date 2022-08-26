import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { getSpotReview } from "../../store/review";
import "./Review.css"



const ReviewsSpot = () => {
    const {spotId} = useParams()

    const reviewsObj = useSelector((state) => state.reviews)
    const reviews = Object.values(reviewsObj)
    // console.log('reviewsObj from component: ', reviewsObj)
    // console.log('reviews from component: ', reviews)
    // const [stars, setStars] = useState("")

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getSpotReview(spotId));
    }, [dispatch]);



    // if (!reviews) return null

    return (
        <div>
        <h3>All the spot review: </h3>
  
            {reviews.length ? reviews.map(review => (
                <div key={review.id} >
                    <div><i className="fa-solid fa-star"></i> {review.stars} </div>
                    <div className="ReviewSpot_review" >{review.review}</div>
                </div> 

           
            )) : <h4>no any review, want to be the first one?</h4>}
        </div>
    );
};

export default ReviewsSpot;