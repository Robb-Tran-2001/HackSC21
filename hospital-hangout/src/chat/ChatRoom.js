import React from 'react';
import firebase from '../firebase'
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../stylesheets/App.css'
import NavigationBar from '../components/NavigationBar'
const auth = firebase.auth();
const firestore = firebase.firestore();

//general chat
class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dummy: '',
            messages: [],
            formValue: ''
        }
        this.dummy = React.createRef();
        this.messagesRef = firestore.collection('messages');
        this.query = this.messagesRef.orderBy('createdAt').limit(25);
        this.sendMessage = this.sendMessage.bind(this)
        this.update = this.update.bind(this)
    }
    componentDidMount() {
        this.update();
    }
    update() {
        firestore.collection('messages').orderBy('createdAt', 'desc').limit(25)
            .onSnapshot( (snapshot) => {
                let m = []
                snapshot.forEach(doc => {
                    if (doc.exists) {
                        m.push(doc.data())
                        console.log(this.state.messages)
                    }
                    else {
                        console.log("nothing for you man")
                    }
                })
                 this.setState({messages: m.reverse()});
            })
    }

    sendMessage = async(e) => {
        e.preventDefault();
        const { uid, photoURL } = auth.currentUser;
        firestore.collection('messages').add({
            text: this.state.formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL: '',
        })
        .then( () =>
            this.setState({formValue: ''}) )
        .then( () => this.dummy.current.scrollIntoView({behavior: 'smooth'}) );
    }
    render() {
        return (
            <>
                <div id="ourbody">
                    <div id="nav-bar"><NavigationBar></NavigationBar></div>
                    <div id="love">
                        {this.state.messages && this.state.messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
                        <div ref={this.dummy}> </div>
                    </div>
                    <div id="grr">
                        <form id="ourform" onSubmit={this.sendMessage}>
                        <input id="ourinput" value={this.state.formValue} placeholder="Message..." onChange={(e)=>this.setState({formValue: e.target.value})}/> 
                        <button id="ourbutton" type="submit" disabled={!this.state.formValue}> Submit Button </button>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

function ChatMessage(props) {
    const {text, uid, photoURL} = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    return (
        <div className={`message ${messageClass}`}>
            <img src={photoURL} />
            <p> {text} </p>
        </div>
    )
}

export default ChatRoom;