import { csrfFetch } from './csrf';

//type:
const LOAD_SPOTS = "spots/loadSpots";
const LOAD_ONE_SPOTS = "spots/loadOneSpots";
const READ_OWNER_SPOTS = "spots/readOwnerSpots";
const ADD_SPOTS = "spots/addSpots";
const UPDATE_SPOTS = "spots/updateSpots";
const GOODBYE_SPOTS = "spots/goodbyeSpots";


//action creator
const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots,
    }
};

const loadOneSpots = (spots) => {
    return {
        type: LOAD_ONE_SPOTS,
        spots,
    }
};

const readOwnerSpots = (spots) => {
    return {
        type: READ_OWNER_SPOTS,
        spots,
    }
};



const addSpots = (spots) => {
    return {
        type: ADD_SPOTS,
        spots,
    }
};

const updateSpots = (spots) => {
    return {
        type: UPDATE_SPOTS,
        spots,
    }
};


const goodbyeSpots = (spots) => {
    return {
        type: GOODBYE_SPOTS,
        spots,
    }
};


//thunk
// get all spots
export const getSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')

    // console.log("response: ", response)

    if (response.ok) {
        const spots = await response.json()
        // console.log("spots: ", spots)
        dispatch(loadSpots(spots.Spots))
    }
}

//get one spot
export const getOneSpots = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    // console.log("response: ", response)
    if (response.ok) {
        const spots = await response.json()
        // console.log("spots from Thunk: ", spots)
        dispatch(loadOneSpots(spots))
    }
}


//get current owner spot
export const getOwnerSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots/current")
     console.log("response: ", response)
    if (response.ok) {
        const spots = await response.json()
        // console.log("spots from Thunk: ", spots.Spots)
        dispatch(readOwnerSpots(spots.Spots))
    }
}




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
                console.log("ownerSpot: ", ownerSpot)
                return ownerSpot;  
        default:
            return state
        }
       
}

export default spotReducer