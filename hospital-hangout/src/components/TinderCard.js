import React from 'react'; 
import '../stylesheets/TinderCard.css'; 

class TinderCard extends React.Component {
	render() {
		return (
			<div className="TinderCard">
				<div class="card">
					<h1 class="username">{this.props.user.username}</h1>
					<div class="description">
						<p>{this.props.user.info}</p>
					</div>
				</div>
			</div>
		); 
	}
}

export default TinderCard