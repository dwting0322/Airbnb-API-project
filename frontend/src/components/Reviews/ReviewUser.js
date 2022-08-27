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

    const user = useSelector((state) => state.session.user)
    // console.log("user", user)

    useEffect(() => {
        dispatch(getUserReview());
    }, [dispatch]);



    // if (!reviews) return null

    return (
        <>
            
            <div className="review_container" >
            <h1 className="review_user_h2">Reviews by you: </h1>

                {user && reviews.length ? reviews.map(review => (
                    <div key={review.id} className="second_div">
                        <div className="first_div">Past reviews you’ve written</div>
                        <div className="ReviewUser_star"><i className="fa-solid fa-star"></i> {review.stars} </div>
                        <div className="ReviewUser_review">{review.review}</div>
                        {console.log(review.id)}

                        <button className="ReviewUser_button" onClick={() => dispatch(deleteReview(review.id))}><i className="fa-solid fa-trash-can"></i> Delete</button>
                    </div>


                )) : <h2 className="ReviewUser_no_an_review_found">You have not written any reviews yet.</h2>}
            </div>
            <footer className='footer_container'>
                <div>
                <i className="fa-brands fa-fort-awesome"></i> © 2022 WonderlandBnB, Inc. · Privacy · Terms · Sitemap
                </div>
                <div className="USD">
                <i className="fa-solid fa-globe"></i> English(US) $ USD
                </div>
            </footer>
        </>
    );
};

export default ReviewsUser;