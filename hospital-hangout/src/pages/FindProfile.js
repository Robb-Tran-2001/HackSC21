import React from 'react'; 
import TinderCard from '../components/TinderCard'; 
import '../stylesheets/FindProfile.css'; 
import NavigationBar from '../components/NavigationBar';
import firebase from '../firebase'
import 'firebase/firestore';
import 'firebase/auth';

const auth = firebase.auth();
const firestore = firebase.firestore();
const filler = {
	username: 'The Bit Fiddler',
	info: 'If you see me here, then you have gone thru all in the database. Come back next time!'
}
class FindProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profiles: [], 
			count: 0
		}
		this.handleOnClickLike = this.handleOnClickLike.bind(this);
		this.handleOnClickDislike = this.handleOnClickDislike.bind(this);
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

	handleOnClickLike(e) {
		e.preventDefault();
		if(this.state.count < this.state.profiles.length) {
			firestore.collection('users').doc(auth.currentUser.uid)
				.update({liked: firebase.firestore.FieldValue.arrayUnion(this.state.profiles[this.state.count].uid) } );
			console.log("FIRST PERSON ", this.state.profiles[this.state.count])
			this.setState(prevState => ({count: prevState.count + 1}))
			console.log("Checkpoint 2");
		}
	}

	handleOnClickDislike(e) {
		if(this.state.count < this.state.profiles.length) {
			this.setState(prevState => ({count: prevState.count + 1}));
			console.log("Checkpoint 3");
		}
	}
	

	render() {
		return (
			<div className="FindProfile">
				<NavigationBar/> 
				<div class="profile-card">
					{/* <p> {this.state.profiles[0].username} </p> */}
					<TinderCard user={this.state.count < this.state.profiles.length ? this.state.profiles[this.state.count] : filler}/> 
				</div>
				<div style={{display: 'flex', justifyContent: 'center'}}>
					<button class="dislike-button" name="dislike" onClick={this.handleOnClickDislike}>
						<img src={process.env.PUBLIC_URL + '/tinder-dislike.jpg'} style={{width: '50px'}}/> 
					</button>
					<button class="like-button" name="like" onClick={this.handleOnClickLike}>
						<img src={process.env.PUBLIC_URL + '/tinder-like.jpg'} style={{width: '50px'}}/> 
					</button>
				</div>
			</div>
		); 
	}
}

export default FindProfile