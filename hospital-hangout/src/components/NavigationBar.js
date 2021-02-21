import React from 'react'; 
import '../stylesheets/NavigationBar.css'; 
import { useHistory, Link } from 'react-router-dom'; 


const NavigationBar = () => {
	return (
		<div className="NavigationBar">
			<div class="bar">
				<Link to="/">
					<img src="/navbar-logo.jpg" class="nav-logo"/>
				</Link>
				<div>
					<Link to="/find-profile" style={{color: 'white', textDecoration: 'none', fontSize: '20px', lineHeight: '50px'}}> 
						Find Profile
					</Link>
				</div>
				<div style={{marginLeft: '50px'}}>
					<Link to="/general-chat" style={{color: 'white', textDecoration: 'none', fontSize: '20px', lineHeight: '50px'}}> 
						General Chat
					</Link>
				</div>
				<div style={{marginLeft: '50px'}}>
					<Link to="/private-chat" style={{color: 'white', textDecoration: 'none', fontSize: '20px', lineHeight: '50px'}}> 
						Private Chat
					</Link>
				</div>
				
			</div>
		</div>
	); 
}

export default NavigationBar