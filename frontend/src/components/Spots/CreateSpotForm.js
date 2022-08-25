import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot } from '../../store/spots';
import SpotForm from './SpotForm';


const CreateSpotForm = () => {
  
    const spot = {
    
      };
  console.log("spot from createSpot", spot)
    return (
      <SpotForm spot={spot} formType="Create Spot" />
    );
  }
  
  export default CreateSpotForm;