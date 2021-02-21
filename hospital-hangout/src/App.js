import Login from './pages/Login'; 
import CreateAccount from './pages/CreateAccount'; 
import FindProfile from './pages/FindProfile'
import EditAccount from './pages/EditAccount'; 
import ChatRoom from './chat/ChatRoom'; 

import {
  BrowserRouter as Router,
  Route, 
  Link, 
} from "react-router-dom";
import React from 'react';
import firebase from './firebase'
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';


const auth = firebase.auth();
const firestore = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
});

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Login}/> 
      <Route exact path="/create-account" component={CreateAccount}/> 
      <Route exact path="/find-profile" component={FindProfile}/> 
      <Route exact path="/edit-account" component={EditAccount}/> 
      <Route exact path="/general-chat" component={ChatRoom}/> 
    </Router>
  ); 
}; 

export default App
