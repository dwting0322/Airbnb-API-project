import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { getSpotReview } from "../../store/review";




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
        <>
        <h2>All the spot review: </h2>
  
            {reviews.length ? reviews.map(review => (
                <div key={review.id}>
                    <div><i className="fa-solid fa-star"></i> {review.stars} </div>
                    <div >{review.review}</div>
                </div> 

           
            )) : <h4>no any review, want to be the first one?</h4>}
        </>
    );
};

export default ReviewsSpot;