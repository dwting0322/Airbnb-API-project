import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { deleteReview, getUserReview } from "../../store/review";


const ReviewsUser = () => {

    const reviewsObj = useSelector((state) => state.reviews)
    const reviews = Object.values(reviewsObj)
    console.log('reviewsObjUser from component: ', reviewsObj)
    console.log('reviewsUser from component: ', reviews)

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getUserReview());
    }, [dispatch]);
    


    // if (!reviews) return null

    return (
        <>
        <h2>All my review: </h2>
  
            {reviews.length ? reviews.map(review => (
                <div key={review.id}>
                    <div><i className="fa-solid fa-star"></i> {review.stars} </div>
                    <div >{review.review}</div>
                    {console.log(review.id)}
                    <button onClick={()=>dispatch(deleteReview(review.id))}>Delete</button>
                </div> 

           
            )) : <h3>no any review found !</h3>}
            
        </>
    );
};

export default ReviewsUser;