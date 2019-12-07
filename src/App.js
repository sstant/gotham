import React from 'react';
import blockstack from 'blockstack';

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
      {
        blockstack.isUserSignedIn() ? (
          <button onClick={signOut}>Sign Out</button>
        ) : (
          <button onClick={signIn}>Sign In w/ Blockstack</button>
        )
      }
    </div>
  );
}

export default App;
