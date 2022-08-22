import React from 'react';
import ReviewForm from "./ReviewForm"


const CreateReviewForm = () => {
  
    const myReview = {
        stars:"",
        review: "",
    };

    return (
      <ReviewForm myReview={myReview} formType="Create a Review" />
    );
}


export default CreateReviewForm;