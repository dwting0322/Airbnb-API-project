import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createReview } from '../../store/review';
import "./Review.css"


const ReviewForm = ({ myReview, formType }) => {

  const history = useHistory();
  const reviewsObj = useSelector((state) => state.reviews);
  // console.log("reviews from component: ", reviews)
  const reviews = Object.values(reviewsObj)
  // console.log("abc from component: ", abc)

  const { spotId } = useParams();
  // console.log("spotId", spotId)
  const spots = useSelector(state => state.spots[spotId])
  const user = useSelector(state => state.session.user)
  // console.log("user from component: ", userId)
  const [stars, setStars] = useState(myReview.stars || "")
  const [review, setReview] = useState(myReview.review || "")
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const dispatch = useDispatch()
 
  
    const filter = reviews.filter(review => review?.userId === user?.id)

  

  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (validationErrors.length > 0) {
      return alert("Cannot Submit");
    }

    if (!user) alert("Please log in before write a review!")

    const myReviewInfo = {
      ...myReview,
      userId: user.id,
      spotId,
      stars,
      review,
    };

    
    // if (filter.length) return alert("User already has a review for this spot")

    // console.log("review", review.id)
    // if(review.review) alert("User already has a review for this spot")

    dispatch(createReview(myReviewInfo))


    setStars('');
    setReview('');
    setValidationErrors([]);
    setHasSubmitted(false);

    //   history.push(`/reviews/${review.id}`);
  };


  useEffect(() => {
    let errors = [];
    if (!stars.length) {
      errors.push("Stars is required");
    }
    if (stars > 5 || stars < 1) {
      errors.push("Stars must be an integer from 1 to 5");
    }
    if (!review.length) {
      errors.push("Review text is required");
    }
    if (review.length > 255 || review.length < 1) {
      errors.push("Review number of words must be from 1 to 255");
    }

    setValidationErrors(errors);

  }, [review, stars]);



  return  user && !filter.length && (
    <form onSubmit={handleSubmit} >
      <h2>{formType}:</h2>

      <ul className="errors">
        {hasSubmitted && validationErrors.map(error => (
          <li key={error}>
            {error}
          </li>
        ))}
      </ul>
      {/* <div className='Review_Container'> */}
        {/* <div className='Review_Star'> */}
          <label>
            Starts:
            <input
              type="number"
              value={stars}
              onChange={e => setStars(e.target.value)}
            />
          </label>
       
        <p>
          <label>
            Review:
        
            <textarea
              value={review}
              onChange={e => setReview(e.target.value)}
            />
          </label>
          </p>
      
      <input type="submit" value={formType} />

    </form>
  );
}

export default ReviewForm;