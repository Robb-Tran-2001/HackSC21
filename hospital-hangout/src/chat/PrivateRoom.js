import React, { useRef, useState } from 'react';
import firebase from '../firebase'
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../stylesheets/App.css'
import NavigationBar from '../components/NavigationBar'
const auth = firebase.auth();
const firestore = firebase.firestore();

//general chat
class PrivateChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dummy: '',
            messages: [],
            formValue: '',
            friends: [],
            roomId: ''
        }
        this.dummy = React.createRef();
        this.messagesRef = firestore.collection('messages');
        this.query = this.messagesRef.orderBy('createdAt').limit(25);
        this.sendMessage = this.sendMessage.bind(this)
        this.update = this.update.bind(this)
        this.callFriend = this.callFriend.bind(this)
    }

    componentDidMount() {
        this.update();
    }

    update() {
        firestore.collection('users').doc(auth.currentUser.uid).get()
            .then(snapshot => {
                if (snapshot.exists) {
                    let mates = snapshot.data().liked
                    let mates_stored = []
                    firestore.collection('users').where('uid', 'in', mates)
                        .get()
                        .then(snapshot => {
                            snapshot.forEach(user => {
                                console.log("friend ", user.data())
                                mates_stored.push(user.data())
                            })
                        })
                    this.setState({friends: mates_stored})
                    console.log("Mates " , mates_stored)
                    console.log("Friends " , this.state.friends)
                } else {
                    console.log("No such document!");
                }  
            })
    }

    callFriend(e) {
        console.log("CLICKED")
        let name = e.target.name || e.target.getAttribute("name");
        let roomMem = [auth.currentUser.uid, name]
        roomMem.sort()
        const room = roomMem[0].concat(roomMem[1]);
        this.setState({roomId: room})
        firestore.collection('rooms').doc(room).set(
            {
                person1: roomMem[0],
                person2: roomMem[1]
            }
        )

        firestore.collection('rooms').doc(room).collection('messages').orderBy('createdAt', 'desc')
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
        firestore.collection('rooms').doc(this.state.roomId).collection('messages').add({
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
                <div class="ourbody">
                    <div class="nav-bar"><NavigationBar></NavigationBar></div>
                    <div class="sidebar">
                        <h1>Contacts</h1>
                        {this.state.friends.map((friend, index) => (<p key = {index} name={friend.uid} onClick={this.callFriend}> {friend.username} </p>))}
                    </div>
                    <div id="proom">
                        <div class="love">
                            {this.state.messages && this.state.messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
                            <div ref={this.dummy}> </div>
                        </div>
                        <div class="grr">
                            <form class="ourform" onSubmit={this.sendMessage}>
                            <input class="ourinput" id="pinput" value={this.state.formValue} placeholder="Message..." onChange={(e)=>this.setState({formValue: e.target.value})}/> 
                            <button class="ourbutton" id="pbutton" type="submit" disabled={!this.state.formValue}> Submit Button </button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

function ChatMessage(props) {
    const {text, uid, photoURL} = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    const imageExists = ((photoURL !== undefined) && (photoURL.length > 0)); 
    return (
        <div className={`message ${messageClass}`}>
            {imageExists ? <img src={photoURL} /> : <img src="/generic-avatar.png"/>}
            <p> {text} </p>
        </div>
    )
}

export default PrivateChatRoom;