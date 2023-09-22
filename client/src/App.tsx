import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import { Button } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useMetaMask } from './hooks/useMetaMask';

function App() {
  const { hasProvider, isConnecting, errorMessage, connectContract, contract } = useMetaMask();
  useEffect(connectContract, []);

  if (isConnecting) return <div> Trying to connect to MetaMask. Please wait. </div>;
  if (!hasProvider)
    return (
      <div>
        Please download the Metamask browser extension and sign up on the same to continue. <br />
        After downloading Metamask, click here to try connecting!
        <Button onClick={connectContract}>Connect me to MetaMask!</Button>
      </div>
    );

  if (isConnecting) return <div>Trying to load the DChess deployed contract. Please wait. </div>;
  if (!contract)
    return <div> Can't find the deployed contract. Please check the logs. {errorMessage} </div>;

  return (
    <div className="App">
      <ToastContainer />
      <Home />
    </div>
  );
}

export default App;
