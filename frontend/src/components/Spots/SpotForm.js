import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot, editSpot } from '../../store/spots';




const SpotForm = ({ spot, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  // console.log("user: ", user)

  const [address, setAddress] = useState(spot.address || "")
  const [city, setCity] = useState(spot.city || "")
  const [state, setState] = useState(spot.state || "")
  const [country, setCountry] = useState(spot.country || "")
  const [lat, setLat] = useState(spot.lat || "")
  const [lng, setLng] = useState(spot.lng || "")
  const [name, setName] = useState(spot.name || "")
  const [description, setDescription] = useState(spot.description || "")
  const [price, setPrice] = useState(spot.price || "")
  const [previewImage, setPreviewImage] = useState(spot.previewImage || "")
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (validationErrors.length > 0) {
      return alert("Cannot Submit");
    }
    if (!user) return alert("Please log in/sign up before become a host!")

    spot = {
      ...spot,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      previewImage,
    };

    if (formType === "Create Spot") {
      const newSpot = await dispatch(createSpot(spot))

      if (newSpot) history.push(`/spots/${newSpot.id}`);


      console.log("newSpot: ", newSpot)

    } else {
      dispatch(editSpot(spot))
      history.push(`/spots/${spot.id}`);
    }

    //   console.log("spot from SpotForm: ",spot)

    setPreviewImage('');
    setAddress('');
    setCity('');
    setState('');
    setCountry('');
    setLat('');
    setLng('');
    setName('');
    setDescription('');
    setPrice('');
    setValidationErrors([]);
    setHasSubmitted(false);
    //   history.push(`/`);

  };


  useEffect(() => {
    let errors = [];
    if (!address.length) {
      errors.push("Street address is required");
    }
    if (!city.length) {
      errors.push("City is required");
    }
    if (!state.length) {
      errors.push("State is required");
    }
    if (!country.length) {
      errors.push("Country is required");
    }
    if (!lat) {
      errors.push("Latitude is not valid");
    }
    if (lat > 90 || lat < -90) {
      errors.push("Latitude must between -90 ~ 90");
    }
    if (!lng) {
      errors.push("Longitude is not valid");
    }
    if (lng > 180 || lat < -180) {
      errors.push("Longitude must between -180 ~ 180");
    }
    if (!name.length) {
      errors.push("Name is required");
    }
    if (name.length > 50) {
      errors.push("Name must be less than 50 characters");
    }
    if (!description.length) {
      errors.push("Description is required");
    }
    if (!price || price <= 0) {
      errors.push("Price per day is required and can't less than or equal to $0");
    }
    if (!previewImage.length) {
      errors.push("Image's url is required");
    }

    setValidationErrors(errors);

  }, [address, city, state, country, lat, lng, name, description, price, previewImage]);



  return (
    <>
      <form onSubmit={handleSubmit} >
        <h1 className='Create_spot_h1'>{formType}:</h1>
        <h2 className='Create_spot_h2'>Find out what you</h2>
        <h2 className='Create_spot_h2'>could earn as a Host</h2>
        <div>
          <div className='Create_spot_word'>Hosts in your area earn an average of $3,800 / month</div>
          <div className='Create_spot_word'>They earn $152 / night</div>
          <div className='Create_spot_word'>They're booked 25 nights / month</div>
        </div>

        <div className='Create_Spot_Container'>
          <div className='upper_div'>
            <ul className="errors">
              {hasSubmitted && validationErrors.map(error => (
                <li className='Create_Spot_error' key={error}>
                  <i className="fa-solid fa-ban"></i> {error}
                </li>
              ))}
            </ul>
          </div>
          <div className='lower_div'>
            <div className="Create_spot_Address">
              <label>
                Address:
                <input
                  type="text"
                  placeholder="address..."
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
              </label>
            </div>

            <div className="Create_spot_City">
              <label>
                City:
                <input
                  type="text"
                  placeholder="city..."
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
              </label>
            </div>

            <div className="Create_spot_State">
              <label>
                State:
                <input
                  type="text"
                  placeholder="state..."
                  value={state}
                  onChange={e => setState(e.target.value)}
                />
              </label>
            </div>

            <div className="Create_spot_Country">
              <label>
                Country:
                <input
                  type="text"
                  placeholder="country..."
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                />
              </label>
            </div>

            <div className="Create_spot_Lat">
              <label>
                Lat:
                <input
                  type="number"
                  placeholder="latitude..."
                  value={lat}
                  onChange={e => setLat(e.target.value)}
                />
              </label>
            </div>

            <div className="Create_spot_Lng">
              <label>
                Lng:
                <input
                  type="number"
                  placeholder="longitude..."
                  value={lng}
                  onChange={e => setLng(e.target.value)}
                />
              </label>
            </div>

            <div className="Create_spot_Name">
              <label>
                Name:
                <input
                  type="text"
                  placeholder="property name..."
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </label>
            </div>

            <div className="Create_spot_Description">
              <label>
                Description:
                <textarea
                  type="text"
                  placeholder="description..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </label>
            </div>

            <div className="Create_spot_Price">
              <label>
                Price:
                <input
                  type="number"
                  placeholder="price..."
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </label>
            </div>

            <div className="Create_spot_Image_Url">
              <label>
                Image Url:
                <input
                  type='url'
                  placeholder="please upload the property's url..."
                  value={previewImage}
                  onChange={e => setPreviewImage(e.target.value)}
                />
              </label>
            </div>

            <input className="Create_spot_button" type="submit" value={formType} />
          
          </div>
        </div>
      </form>
      <footer className='footer_container_CreateForm'>
        <div>
          © 2022 WonderlandBnB, Inc. · Privacy · Terms · Sitemap
        </div>
        <div>
          English(US)  $ USD
        </div>
      </footer>
      
    </>
  );
}

export default SpotForm;