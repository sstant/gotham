import React from 'react';
import blockstack from 'blockstack';
import './assets/App.css';

function App() {

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
    const userData = blockstack.loadUserData()
     showProfile(userData.profile)
   } else if (blockstack.isSignInPending()) {
     blockstack.handlePendingSignIn()
     .then(userData => {
       showProfile(userData.profile)
     })
   }

   console.log(blockstack.isUserSignedIn());

  return (
    <div className="App">
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="jumbotron">Insert idea here</div>
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
