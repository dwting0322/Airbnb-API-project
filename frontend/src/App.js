// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsBrowser from "./components/Spots/SpotsBrowser";
import SpotDetail from "./components/Spots/SpotDetail";
import SpotOwner from "./components/Spots/SpotOwner";
import CreateSpotForm from "./components/Spots/CreateSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route exact path="/">
            <SpotsBrowser />
          </Route>

          <Route exact path="/spots/current">
            <SpotOwner />
          </Route>

          <Route exact path="/spots/:spotId">
            <SpotDetail />
          </Route>

          <Route exact path="/spots">
            <CreateSpotForm />
          </Route>
          
        </Switch>
      )}
    </>
  );
}

export default App;