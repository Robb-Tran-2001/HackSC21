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

	handleUsernameChange = event => {
		this.setState({username: event.target.value}); 
	}

	handlePasswordChange = event => {
		this.setState({password: event.target.value}); 
	}

	handleSubmit = event => {
		event.preventDefault(); 
		console.log("username: " + this.state.username + "; password: " + this.state.password); 
		//make request to endpoint to login 
	}

	render() {
		const passwordStyle = {
			marginTop: '20px'
		}; 

		return (
			<div>
				<img class="logo" src={process.env.PUBLIC_URL + '/logo.png'}/> 
<<<<<<< Updated upstream
				<SignIn/>
=======
				<p class="motto">More Than Just a Hangout</p>
				<SignIn/> 
					
>>>>>>> Stashed changes
			</div>
		); 
	}
}

export default LoginComponent; 