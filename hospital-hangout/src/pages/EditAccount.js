import React from 'react'; 
import NavigationBar from '../components/NavigationBar'; 
import '../stylesheets/EditAccount.css'; 
import firebase from '../firebase'
import 'firebase/firestore';
import 'firebase/auth';

const auth = firebase.auth();
const firestore = firebase.firestore();

class EditAccount extends React.Component {
	constructor(props) {
		super(props);  
		this.state = {
			description: ''
		}
	}
	componentDidMount() {
		document.body.style.backgroundImage = "url('/find-profile-background.jpg')";
	}

	handleDescription = (e) => {
		this.setState({description: e.target.value}); 
	}

	handleSubmit = (e) => {
		e.preventDefault(); 
		firestore.collection('users').where("uid", "===", auth.currentUser.uid).update({"info": this.state.description});
	}

	render() {
		return (
			<div className="EditAccount">
				<NavigationBar/>
				<div class="edit-input-form">
					<h1 style={{display: 'flex', justifyContent: 'center', paddingTop: '30px', color: '#5E60CE'}}>Edit Account</h1>
					<form onSubmit={this.handleSubmit} style={{marginBottom: '30px'}}>
						<input type="text" value={this.state.description} placeholder="About Me" class="description-field" style={{marginTop: '20px'}} onChange={this.handleDescription}/> 
						<input type="submit" value="Submit" class="submit-edit"/> 
					</form>
				</div>
			</div> 
		); 
	}
}

export default EditAccount