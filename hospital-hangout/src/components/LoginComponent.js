import React from 'react'; 
import '../stylesheets/LoginComponent.css'; 
import CreateAccount from '../pages/CreateAccount'; 
import { Link } from 'react-router-dom'; 
import SignIn from './SignIn'; 
import addNotification from 'react-push-notification';
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
		firestore.collection('users').get()
			.then((users) => { 
				let newPerson = true
				users.forEach(user => {
					if(user.data().username === this.state.username && this.state.password !== ''
						&& this.state.password && user.data().password === this.state.password) newPerson = false
				})
				if(!newPerson) console.log("E") //history.push('/find-profile'); 
				else {
					addNotification({
						title: 'Wrong Credentials',
						subtitle: 'Password or Username might be wrong',
						message: 'Try again with a different username/password',
						theme: 'darkblue',
						native: true // when using native, your OS will handle theming.
					});
				}
			})
	}

	render() {
		const passwordStyle = {
			marginTop: '20px'
		}; 

		return (
			<div>
				<img class="logo" src={process.env.PUBLIC_URL + '/logo.png'}/> 
				<form onSubmit={this.handleSubmit} style={{marginBottom: '30px'}}>
					<input type="text" value={this.state.username} placeholder="Username" class="input-field" onChange={this.handleUsernameChange}/>
					<input type="password" value={this.state.password} placeholder="Password" class="input-field" style={passwordStyle} onChange={this.handlePasswordChange}/>
					<div class="login-action">
						<SignIn/> 
						<input type="submit" value="Submit" class="submit-button"/> 
					</div>
				</form>
				<Link to="/create-account" style={{display: 'flex', justifyContent: 'center'}}>Don't have an account? Sign Up</Link>
			</div>
		); 
	}
}

export default LoginComponent; 