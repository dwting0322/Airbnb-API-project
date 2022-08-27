import { csrfFetch } from './csrf';


// type:

const LOAD_ALL_SPOT_REVIEWS = "reviews/getAllSpotReview"
const LOAD_ALL_USER_REVIEWS = "reviews/getAllUserReview"
const ADD_REVIEW = "reviews/createReview"
const GOODBYE_REVIEW = "reviews/goodbyeReviews";

//action creator:
const loadAllSpotReview = (reviews) => ({
    type: LOAD_ALL_SPOT_REVIEWS,
    reviews
});

const loadAllUserReview = (reviews) => ({
    type: LOAD_ALL_USER_REVIEWS,
    reviews
});

const addReview = (review) => ({
    type: ADD_REVIEW,
    review
});


const goodbyeReview = (id) => ({
  type: GOODBYE_REVIEW,
  id
});


//thunk:
// get all spot review thunk
export const getSpotReview = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    // console.log("response: ", response)

    if (response.ok) {
        const reviews = await response.json()
        // console.log("reviews from thunk: ", reviews)
        dispatch(loadAllSpotReview(reviews.Reviews))
    }
}

// get all user review thunk
export const getUserReview = () => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/current`)

    console.log("response: ", response)

    if (response.ok) {
        const reviews = await response.json()
        // console.log("reviews from thunk: ", reviews)
        dispatch(loadAllUserReview(reviews.Reviews))
    }
}


// create a review for spot

export const createReview = (myReviewInfo) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${myReviewInfo.spotId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(myReviewInfo)
    });
    // console.log("response: ", response)
  
    if (response.ok) {
      const review = await response.json();
      dispatch(addReview(review));
    //   console.log("spot: ", spot)
    }
  };

// delete reducer
  export const deleteReview = (id) => async (dispatch) => {
    console.log("id from thunk delete: ", id)
    const response = await csrfFetch(`/api/reviews/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(mySpot)
    });
    // console.log("Delete response from thunk: ", response)
  
    if (response.ok) {
      const review = await response.json();
      dispatch(goodbyeReview(id));
      // console.log("Delete spot from thunk: ", review)
    }
  };


//reducer:

const initialState = {}
const reviewReducer = (state = initialState, action) =>{
      let newState = {};
      switch (action.type) {
        case LOAD_ALL_SPOT_REVIEWS:
        
            //   console.log("action.review: ", action.review)
                action.reviews.forEach(review => {
                newState[review.id] = review
              })
            //  newState = {...newState}
              return newState
        case LOAD_ALL_USER_REVIEWS:
             newState = {}
            //   console.log("action.spots: ", action.spots)
                action.reviews.forEach(review => {
                newState[review.id] = review
              })
            //  newState = {...newState}
                  return newState
        case ADD_REVIEW : 
                newState = {...state}
                  // console.log("action.review  ", action.review)
                newState[action.review.id] = action.review
                  // console.log("newState from review reducer after ", newState)
                return newState
            
        case GOODBYE_REVIEW : 
            newState = {...state}
              // console.log("action.review  ", action.review)
              delete newState[action.id]
              // console.log("newState from review reducer after ", newState)
            return newState
          default:
            return state
      }
    };

        export default reviewReducer