import React from 'react';
import firebase from '../firebase';
import 'firebase/auth';
import { withRouter } from 'react-router-dom';
import '../stylesheets/SignIn.css'; 

const auth = firebase.auth(); 
const firestore = firebase.firestore();
const SignIn = withRouter(({history}) => (
    <button onClick={() => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then((result) => {
            firestore.collection('users').get()
                .then((users) => { 
                    let newPerson = true;
                    users.forEach(user => {
                        if(user.data().uid === result.user.uid) newPerson = false
                    })
                    console.log("NEW?", newPerson);
                    if(newPerson) {
                        firestore.collection('users').doc(result.user.uid).set({
                            info: '',
                            uid: result.user.uid,
                            username: result.user.displayName,
                            photoURL: result.user.photoURL
                        })
                    }
                })
            history.push('/find-profile'); 
        }); 
    }} class="google-sign-in">
        Continue with Google
    </button>
)); 

export default SignIn; 
