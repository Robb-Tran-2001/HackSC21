import React from 'react'; 
import TinderCard from '../components/TinderCard'; 
import '../stylesheets/FindProfile.css'; 
import NavigationBar from '../components/NavigationBar';
import firebase from '../firebase'
import 'firebase/firestore';
import 'firebase/auth';

const auth = firebase.auth();
const firestore = firebase.firestore();

class FindProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profiles: [], 
			count: 0
		}
		this.handleOnClick = this.handleOnClick.bind(this);
	}
	
	componentDidMount() { 
		document.body.style.backgroundImage = "url('/find-profile-background.jpg')";
		firestore.collection('users').where("uid", "!=", auth.currentUser.uid).get()
			.then((users) => {
				let u = [];
				users.forEach(user => {
					u.push(user.data());
				})
				this.setState({profiles: u});
				console.log(this.state.profiles)
			})
	}

	handleOnClick(e) {
		e.preventDefault();
		const name = e.target.name; 
		if(name === 'like' ) {
			firestore.collection('users').where("uid", "===", auth.currentUser.uid)
				.update({"liked": this.state.profiles[0].uid});
		} 
		this.state.profiles.shift();
	}

	render() {
		return (
			<div className="FindProfile">
				<NavigationBar/> 
				<div class="profile-card">
					<TinderCard user={this.state.profiles[0]}/> 
				</div>
				<div style={{display: 'flex', justifyContent: 'center'}}>
					<button class="dislike-button" name="dislike" onClick={this.handleOnClick}>
						<img src={process.env.PUBLIC_URL + '/tinder-dislike.jpg'} style={{width: '50px'}}/> 
					</button>
					<button class="like-button" name="like" onClick={this.handleOnClick}>
						<img src={process.env.PUBLIC_URL + '/tinder-like.jpg'} style={{width: '50px'}}/> 
					</button>
				</div>
			</div>
		); 
	}
}

export default FindProfile