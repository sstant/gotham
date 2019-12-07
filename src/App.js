import React, { useState } from 'react';
import blockstack from 'blockstack';
import './assets/App.css';

import {
  UserSession,
  AppConfig
} from 'blockstack';

function App() {

  const appConfig = new AppConfig()
  const userSession = new UserSession({ appConfig: appConfig });

  const [authed, setAuthed] = useState(userSession.isUserSignedIn());
  const [profile, setProfile] = useState(null);

  console.log('authed', authed);
  // console.log(userSession);
  // console.log(userSession.isUserSignedIn());

  const signIn = () => {
    blockstack.redirectToSignIn();
  };

  const signOut = () => {
    blockstack.signUserOut(window.location.origin);
  };

  const showProfile = profile => {
    console.log(profile);
  };

  if (blockstack.isUserSignedIn()) {
    const userData = userSession.loadUserData();
    console.log(userData);
    //const userData = blockstack.loadUserData()
     //showProfile(userData.profile)
   } else if (blockstack.isSignInPending()) {
     blockstack.handlePendingSignIn()
     .then(userData => {
       console.log(userData);
       showProfile(userData.profile)
     })
   }

  console.log(profile);


  return (
    <div className="App">
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="jumbotron">
            <h1>Insert idea here</h1>
          </div>
        </div>
        <div className="col-md-4">
          {
            blockstack.isUserSignedIn() ? (
              <button className="btn btn-primary btn-block" onClick={signOut}>Sign Out</button>
            ) : (
              <button className="btn btn-success btn-block" onClick={signIn}>Sign In w/ Blockstack</button>
            )
          }
        </div>
      </div>
    </div>
      
    </div>
  );
}

export default App;
