import React, { useRef, useState } from 'react';
import firebase from '../firebase'
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';


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
        // this.messagesRef = firestore.collection('messages');
        // this.query = this.messagesRef.orderBy('createdAt').limit(25);
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
                <div>
                    {this.state.messages && this.state.messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
                    <div ref={this.dummy}> </div>
                </div>
                <form onSubmit={this.sendMessage}>
                <input value={this.state.formValue} onChange={(e)=>this.setState({formValue: e.target.value})}/> 
                <button type="submit" disabled={!this.state.formValue}> Submit Button </button>
                </form>
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