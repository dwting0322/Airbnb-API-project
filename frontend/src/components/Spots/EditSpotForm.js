import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editSpot } from '../../store/spots';
import SpotForm from './SpotForm';


const EditSpotForm = () => {
    const {spotId} = useParams();
//  console.log("spotId from EditSpot", spotId)
    const spot = useSelector(state => state.spots[spotId])
    // console.log("spot from Editspot", spot)

    return (
        <SpotForm spot={spot} formType="Update Spot" />
      );



//     // console.log("spots: ", spot)

//     const dispatch = useDispatch();
//     const history = useHistory();

//     const [previewImage, setPreviewImage] = useState("")
//     const [address, setAddress] = useState("")
//     const [city, setCity] = useState("")
//     const [state, setState] = useState("")
//     const [country, setCountry] = useState("")
//     const [lat, setLat] = useState("")
//     const [lng, setLng] = useState("")
//     const [name, setName] = useState("")
//     const [description, setDescription] = useState("")
//     const [price, setPrice] = useState("")
//     const [validationErrors, setValidationErrors] = useState([]);
//     const [hasSubmitted, setHasSubmitted] = useState(false);

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       setHasSubmitted(true);
//       if (validationErrors.length > 0) {
//         return alert("Cannot Submit");
//     }

//     const mySpot = {
//         id: spotId,
//         address,
//         city,
//         state,
//         country,
//         lat,
//         lng,
//         name,
//         description,
//         price,
//         previewImage,
//       };
  
//     dispatch(editSpot(mySpot))

//     history.push(`/spots/${spotId}`);
//     };
  

//     useEffect(() => {
//         let errors = [];
//         if (!address.length) {
//           errors.push("Street address is required");
//         }
//         if (!city.length) {
//             errors.push("City is required");
//           }
//           if (!state.length) {
//             errors.push("State is required");
//           }
//           if (!country.length) {
//             errors.push("Country is required");
//           }
//           if (!lat) {
//             errors.push("Latitude is not valid");
//           }
//           if (lat > 90 && lat < -90) {
//             errors.push("Latitude must between -90 ~ 90");
//           }
//           if (!lng) {
//             errors.push("Longitude is not valid");
//           }
//           if (lng > 180 && lat < -180) {
//             errors.push("Longitude must between -180 ~ 180");
//           }
//           if (!name.length) {
//             errors.push("Name is required");
//           }
//           if (name.length > 50) {
//             errors.push("Name must be less than 50 characters");
//           }
//           if (!description.length) {
//             errors.push("Description is required");
//           }
//           if (!price || price <= 0) {
//             errors.push("Price per day is required and can't less than or equal to $0");
//           }
//           if (!previewImage.length) {
//             errors.push("Image's url is required");
//           }
        
//         setValidationErrors(errors);
      
//       }, [address, city,state ,country, lat, lng, name, description, price, previewImage]);


//     return (
//       <form onSubmit={handleSubmit} >
//         <h2>Update a Spot</h2>

//         <ul className="errors">
//             {hasSubmitted && validationErrors.map(error => (
//             <li key={error}>
//                 {error}
//             </li>
//             ))}         
//         </ul>

//         <label>
//           Address: 
//           <input 
//             type="text"
//             placeholder="address..."
//             value={address}
//             onChange={e => setAddress(e.target.value)}
//           />
//         </label>
//         <label>
//           City: 
//           <input 
//             type="text"
//             placeholder="city..."
//             value={city}
//             onChange={e => setCity(e.target.value)}
//           />
//         </label>
//         <label>
//            State: 
//           <input 
//             type="text"
//             placeholder="state..."
//             value={state}
//             onChange={e => setState(e.target.value)}
//           />
//         </label>
//         <label>
//             Country: 
//           <input 
//             type="text"
//             placeholder="country..."
//             value={country}
//             onChange={e => setCountry(e.target.value)}
//           />
//         </label>
//         <label>
//             Lat: 
//           <input 
//             type="number"
//             placeholder="latitude..."
//             value={lat}
//             onChange={e => setLat(e.target.value)}
//           />
//         </label>
//         <label>
//             Lng: 
//           <input 
//             type="number"
//             placeholder="longitude..."
//             value={lng}
//             onChange={e => setLng(e.target.value)}
//           />
//         </label>
//         <label>
//             Name: 
//           <input 
//             type="text"
//             placeholder="property name..."
//             value={name}
//             onChange={e => setName(e.target.value)}
//           />
//         </label>
//         <label>
//             Description: 
//           <textarea 
//              type="text"
//              placeholder="description..."
//             value={description}
//             onChange={e => setDescription(e.target.value)}
//           />
//         </label>
//         <label>
//             Price: 
//           <input 
//             type="number"
//             placeholder="price..."
//             value={price}
//             onChange={e => setPrice(e.target.value)}
//           />
//         </label>
//         <label>
//             Image Url: 
//           <input 
//             type='url'
//             placeholder="please upload the property's url..."
//             value={previewImage}
//             onChange={e => setPreviewImage(e.target.value)}
//           />
//         </label>
//         <button 
//         type="submit"
//         // disabled={validationErrors.length > 0}
//         >Update Spot</button>
//       </form>
//     );
  }
  
  export default EditSpotForm;