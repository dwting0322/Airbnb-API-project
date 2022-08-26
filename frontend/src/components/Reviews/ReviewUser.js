import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { deleteReview, getUserReview } from "../../store/review";


const ReviewsUser = () => {

    const reviewsObj = useSelector((state) => state.reviews)
    const reviews = Object.values(reviewsObj)
    // console.log('reviewsObjUser from component: ', reviewsObj)
    // console.log('reviewsUser from component: ', reviews)

    const dispatch = useDispatch();

    const user = useSelector((state)=> state.session.user)
// console.log("user", user)

    useEffect(() => {
        dispatch(getUserReview());
    }, [dispatch]);
    
 

    // if (!reviews) return null

    return (
        <>
        <h1 className="review_user_h2">All my review: </h1>
  
            {user && reviews.length ? reviews.map(review => (
                <div key={review.id} className="review_container">
                    <div className="ReviewUser_star"><i className="fa-solid fa-star"></i> {review.stars} </div>
                    <div className="ReviewUser_review">{review.review}</div>
                    {console.log(review.id)}
                    <button className="ReviewUser_button" onClick={()=>dispatch(deleteReview(review.id))}>Delete</button>
                </div> 

           
            )) : <h2 className="ReviewUser_no_an_review_found">No any review found ! Please log in to see all your review!</h2>}
            
        </>
    );
};

export default ReviewsUser;