import React, { useState, useEffect } from "react";
import blockstack from "blockstack";
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import "./assets/App.css";

import { UserSession, AppConfig } from "blockstack";

const AMBER_API_KEY = 'UAK65eb3bc4c3f829e5ff4fac12672ee399';

function App() {
  const appConfig = new AppConfig();
  const userSession = new UserSession({
    appConfig: appConfig
  });

  const [authed, setAuthed] = useState(userSession.isUserSignedIn());
  const [profile, setProfile] = useState(null);
  const [lineData, setLineData] = useState([])
  const [lineLabels, setLineLabels] = useState([]);

  console.log("authed", authed);

  const signIn = () => {
    blockstack.redirectToSignIn();
  };

  const signOut = () => {
    blockstack.signUserOut(window.location.origin);
  };

  const showProfile = profile => {
    console.log(profile);
  };

  if (userSession.isUserSignedIn()) {
    const userData = userSession.loadUserData();
    console.log(userData);
  } else if (userSession.isSignInPending()) {
    userSession.handlePendingSignIn().then(userData => {
      console.log(userData);
      showProfile(userData.profile);
    });
  }

  useEffect(() => {


    // GAS PREDICTIONS
    axios.get(`https://web3api.io/api/v2/transactions/gas/predictions`, { headers: { 'x-api-key': AMBER_API_KEY }}).then(res => {
      const result = [];
      console.log(res.data.payload);
      /*
      res.data.forEach(point => {
        result.push({ value: point[1], time: point[0] })
      })
      this.setState({ data: result })
      */
    }).catch(err => {
      console.log('err', err)
    });


    // LATEST TRANSACTIONS

  
    axios.get(`https://web3api.io/api/v2/transactions?status=all&size=100`, { headers: { 'x-api-key': AMBER_API_KEY }}).then(res => {
      console.log('Latest Transactions:');
      console.log(res.data.payload);
      const { records } = res.data.payload;
      setLineLabels(records.map(tx => moment(tx.timestamp).format('mm:ss')));
      setLineData(records.map(tx => tx.gasPrice / 1000000));
    }).catch(err => {
      console.log('err', err)
    });

  }, []);

  console.log(lineLabels);
  console.log(lineData);
  console.log(profile);

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="jumbotron">
              <h1>Latest Transactions</h1>
              <Line data={{
                labels: lineLabels,
                datasets: [
                  {
                    label: 'Gas Price',
                    data: lineData
                  }
                ]
              }} />
            </div>
          </div>
          <div className="col-md-4">
            {blockstack.isUserSignedIn() ? (
              <button className="btn btn-primary btn-block" onClick={signOut}>
                Sign Out
              </button>
            ) : (
              <button className="btn btn-success btn-block" onClick={signIn}>
                Sign In w / Blockstack
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
