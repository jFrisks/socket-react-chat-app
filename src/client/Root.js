import React from 'react';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import MainLayout from './MainLayout';
import Chatroom from './Chatroom';
import Home from './Home';
import Loader from './Loader';
import UserSelection from './UserSelection';

import socket from './socket';
import localSocket from './localSocket';

import users from '../config/users'

import chatroomImage from '../public/chatrooms/alexandria.jpg';
import chatroomImage2 from '../public/chatrooms/hilltop.jpg';
import chatroomImage3 from '../public/chatrooms/sanctuary.jpg';
import chatroomImage4 from '../public/chatrooms/terminus.jpg';
import userImage1 from '../public/users/carol.jpg';
import userImage2 from '../public/users/daryl.jpg';
import userImage3 from '../public/users/negan.jpeg';
import userImage4 from '../public/users/rick.jpg';


const chatrooms = [
    {
        name: "ALEXANDRIA",
        image: chatroomImage,
        messages: [
            {
                user: "PERSON 1",
                message: "HEJSAN",
                img: userImage1,
                key: 1,
            },
            {
                user: "PERSON 2",
                message: "BLÄBLÄ",
                img: userImage2,
                key: 2,
            },
            {
                user: "PERSON 3",
                message: "BLÄBLÄ",
                img: userImage3,
                key: 3,
            },
            {
                user: "PERSON 1",
                message: "SKIT PÅ DIG",
                img: userImage1,
                key: 4,
            },
            {
                user: "PERSON 2",
                message: "HIHIHIH",
                img: userImage2,
                key: 5,
            },
            {
                user: "PERSON 3",
                message: "SNYGGT SAGT!",
                img: userImage3,
                key: 6,
            },
            {
                user: "PERSON 3",
                message: "BLÄBLÄ",
                img: userImage3,
                key: 7,
            },
            {
                user: "PERSON 1",
                message: "SKIT PÅ DIG",
                img: userImage1,
                key: 8,
            },
            {
                user: "PERSON 2",
                message: "HIHIHIH",
                img: userImage2,
                key: 9,
            },
            {
                user: "PERSON 3",
                message: "SNYGGT SAGT!",
                img: userImage3,
                key: 10,
            },
        ],
    },
    {
        name: "ÅLAND",
        image: chatroomImage2,
        messages: [
            {
                user: "PERSON 1",
                message: "HEJSAN",
                img: userImage1,
                key: 1,
            },
            {
                user: "PERSON 2",
                message: "BLÄBLÄ",
                img: userImage2,
                key: 2,
            },
        ],
    },
    {
        name: "SVERIGE",
        image: chatroomImage3,
        messages: [
            {
                user: "PERSON 1",
                message: "HEJSAN",
                img: userImage1,
                key: 1,
            },
            {
                user: "PERSON 2",
                message: "BLÄBLÄ",
                img: userImage2,
                key: 2,
            },
        ],
    },
    {
        name: "USA",
        image: chatroomImage4,
        messages: [
            {
                user: "PERSON 1",
                message: "HEJSAN",
                img: userImage1,
                key: 1,
            },
            {
                user: "PERSON 2",
                message: "BLÄBLÄ",
                img: userImage2,
                key: 2,
            },
        ],
    }
]

class Root extends React.Component {
    constructor(props, context){
        super(props);

        this.state = {
            client: localSocket(),
            user: null,
            chatrooms: chatrooms,
            selectedChatroom: null,
            userSelectionOpen: false,
        }        
        this.registerUser = this.registerUser.bind(this);
        this.handleChatroomLeave = this.handleChatroomLeave.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleUserSelectionClickOpen = this.handleUserSelectionClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
    }

    handleUserSelectionClickOpen(){
        this.setState({
            userSelectionOpen: true
        },
        () => console.log('handledClick. UserSel should be: ', this.state.userSelectionOpen)
        )
    }
  
    handleClose() {
        this.setState({userSelectionOpen : false})
    }

    handleSelection(user) {
        this.registerUser(user);
    }
    
    handleChatroomClick(clickedRoom, e) {
        this.setState({
            selectedChatroom : clickedRoom
        });
        console.log('Clicked and selected chatroom', clickedRoom)
    }

    handleChatroomLeave() {
        const lastChatroom = this.state.selectedChatroom;
        this.setState({
            selectedChatroom : null
        });
        console.log('Left chatroom: ', lastChatroom);
    }

    registerUser(userToRegister) {
        //TODO - connect to server. Also look if we should replace isRegisterInProcess with userSelectionOpen

        //callback after user has been registred
        const onRegisterResponse = (user) => this.setState({userSelectionOpen : false, user})
        const onRegisterCallback = (err, user) => {
            //handle errors otherwise return user. Or, you could also most likely assume user is null or user and do one onRegisterResponse call
            //TODO - remove return statements
            if (err) return onRegisterResponse(null)
            else return onRegisterResponse(user)
        }

        console.log('calling client to server to handle Register')
        this.setState({userSelectionOpen : true})
        this.state.client.register(userToRegister, onRegisterCallback)

        //TODO - remove OLD locally working
        /*
        this.setState({
            user: userToRegister,
            userSelectionOpen: false
        })
        */
    }

    handleSendMessage(message, callback) {
        this.state.client.message(
            this.state.selectedChatroom.name,
            message,
            callback
        );
    }

    isUserAndChatroomSelected() {
        const {selectedChatroom, user} = this.state;
        if(selectedChatroom && user) 
            return true;
        else
            return false;
    }

    showChatroom() {
        return (
            <Chatroom
                chatroom={this.state.selectedChatroom}
                user={this.state.user}
                chatHistory={this.state.selectedChatroom.messages}
                registerHandler={this.state.client.registerHandler}
                unregisterHandler={this.state.client.unregisterHandler}
                onSendMessage={this.handleSendMessage}
                onLeave={this.handleChatroomLeave}
            />
        )
    }

    showHome() {
        return (
            <Home
                chatrooms={chatrooms}
                onEnterChatroom={(chatroom, e) => this.handleChatroomClick(chatroom, e)}
            />
        )
    }

    showUserSelection() {
        //Users are loading in background since we render but use open state to shof/hide it
        return (
            <UserSelection
                onClose={this.handleClose}
                onSelection={this.handleSelection}
                open={this.state.userSelectionOpen}
                selectedUser={this.state.user}
                getAvailableUsers={this.state.client.getAvailableUsers}
            />
        )
    }

    render() {
        return (
            <MuiThemeProvider>
                <MainLayout user={this.state.user} onUserSelectionClick={this.handleUserSelectionClickOpen}>
                    {this.isUserAndChatroomSelected() ? this.showChatroom() : this.showHome() }
                    {this.showUserSelection()}
                </MainLayout>
            </MuiThemeProvider>
        )
    }
    
}

export default Root;