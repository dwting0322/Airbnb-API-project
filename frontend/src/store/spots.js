import { csrfFetch } from './csrf';

//type:
const LOAD_SPOTS = "spots/loadSpots";
const LOAD_ONE_SPOTS = "spots/loadOneSpots";
const READ_OWNER_SPOTS = "spots/readOwnerSpots";
const ADD_SPOTS = "spots/addSpots";
const UPDATE_SPOTS = "spots/updateSpots";
const GOODBYE_SPOT = "spots/goodbyeSpot";


//action creator
//get all spot action
const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots,
    }
};

//get one spot action
const loadOneSpots = (spots) => {
    return {
        type: LOAD_ONE_SPOTS,
        spots,
    }
};
//get current owner spot action
const readOwnerSpots = (spots) => {
    return {
        type: READ_OWNER_SPOTS,
        spots,
    }
};

// create action
const addSpots = (spots) => {
    return {
        type: ADD_SPOTS,
        spots,
    }
};

// update action
const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOTS,
        spot,
    }
};


const goodbyeSpot = (spotId) => {
    return {
        type: GOODBYE_SPOT,
        spotId,
    }
};


//thunk 
// get all spots thunk
export const getSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')
    if (response.ok) {
        const spots = await response.json()
        // console.log("spots.Spots - get all spot thunk: ", spots.Spots)
        dispatch(loadSpots(spots.Spots))
    }
}


//get one spot thunk
export const getOneSpots = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    // console.log("response: ", response)
    if (response.ok) {
        const spots = await response.json()
        // console.log("spots - get one spot Thunk: ", spots)
        dispatch(loadOneSpots(spots))
    }
}


//get current owner spot thunk
export const getOwnerSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots/current")
    //  console.log("response: ", response)
    if (response.ok) {
        const spots = await response.json()
        // console.log("spots.Spots - current owner spot Thunk: ", spots.Spots)
        dispatch(readOwnerSpots(spots.Spots))
    }
}

// create spot thunk
export const createSpot = (payload) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    // console.log("response: ", response)
  
    if (response.ok) {
      const spot = await response.json();
    //  const newImageObj = {
    //     spotId: spot.id,
    //     url: payload.previewImage
    //  }
    //   const responseImage = await csrfFetch(`/api/spots/${spot.id}/images`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(newImageObj)
    //   });

      dispatch(addSpots(spot));
      return spot
    //   console.log("spot: ", spot)
    }
  };


// update spot thunk
  export const editSpot = (mySpot) => async (dispatch) => {
    console.log("mySpot: ", mySpot)
    const response = await csrfFetch(`/api/spots/${mySpot.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mySpot)
    });
    // console.log("response from thunk: ", response)
  
    if (response.ok) {
      const spot = await response.json();
      dispatch(updateSpot(spot));
      console.log("spot from thunk: ", spot)
    }
  };


  export const deleteSpot = (spotId) => async (dispatch) => {
    console.log("spotId: ", spotId)
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(mySpot)
    });
    // console.log("Delete response from thunk: ", response)
  
    if (response.ok) {
      const spot = await response.json();
      dispatch(goodbyeSpot(spotId));
      console.log("Delete spot from thunk: ", spot)
    }
  };




//reducer

const initialState = {}
const spotReducer = (state = initialState, action) =>{
      let newState={};
      switch (action.type) {
        case LOAD_SPOTS:
              const allSpot = {};
            //   console.log("action.spots: ", action.spots)
              action.spots.forEach(spot => {
                allSpot[spot.id] = spot
              })
             newState = {...state, ...allSpot}
              return newState;
        case LOAD_ONE_SPOTS : 
                newState = {...state}
                // console.log("action.spots  ", action.spots)
                newState[action.spots.id] = action.spots
                // console.log("newState from getOneSpot reducer after ", newOneState)
                return newState
        case READ_OWNER_SPOTS : 
                const ownerSpot = {};
                //   console.log("action.spots: ", action.spots)
                action.spots.forEach(spot => {
                ownerSpot[spot.id] = spot
                })
                // newState = {...state, ...ownerSpot}
                // console.log("ownerSpot: ", ownerSpot)
                return ownerSpot;  

        case ADD_SPOTS : 
                newState = {...state}
                // console.log("action.spots  ", action.spots)
                newState[action.spots.id] = action.spots
                // console.log("newState from getOneSpot reducer after ", newOneState)
                return newState

        case UPDATE_SPOTS : 
                newState = {...state}
                // console.log("action.spots  ", action.spot)
                newState[action.spot.id] = action.spot
                // console.log("newState from  reducer after ", newState)
                return newState

        case GOODBYE_SPOT : 
                newState = {...state}
                // console.log("action.spots  ", action.spot)
                delete newState[action.spotId]
                // console.log("newState from  reducer after ", newState)
                return newState
        default:
            return state
        }
       
}

export default spotReducer