import React from 'react'; 
import '../stylesheets/LoginComponent.css'; 
import CreateAccount from '../pages/CreateAccount'; 
import { Link } from 'react-router-dom'; 
import SignIn from './SignIn'; 
import firebase from '../firebase'
import 'firebase/firestore';
import 'firebase/auth';

const firestore = firebase.firestore()

class LoginComponent extends React.Component {
	constructor(props) {
		super(props); 
		this.state = {
			username: '', 
			password: ''
		}; 
	}

	render() {
		const passwordStyle = {
			marginTop: '20px'
		}; 

		return (
			<div>
				<img class="logo" src={process.env.PUBLIC_URL + '/logo.png'}/> 
				<SignIn/>
			</div>
		); 
	}
}

export default LoginComponent; 