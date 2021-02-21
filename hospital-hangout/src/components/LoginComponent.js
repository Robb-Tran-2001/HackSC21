import React from 'react'; 
import '../stylesheets/LoginComponent.css'; 
import CreateAccount from '../pages/CreateAccount'; 
import { Link } from 'react-router-dom'; 
import SignIn from './SignIn'; 

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