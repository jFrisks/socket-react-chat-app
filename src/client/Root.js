import React from 'react';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import MainLayout from './MainLayout';
import Chatroom from './Chatroom';
import Home from './Home';
import Loader from './Loader';
import UserSelection from './UserSelection';

import socket from './socket';
import localSocket from './localSocket';

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
            chatrooms: null,
            selectedChatroom: null,
            userSelectionOpen: false,
        }        

        this.registerUser = this.registerUser.bind(this);
        this.handleOnLeaveChatroom = this.handleOnLeaveChatroom.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleUserSelectionClickOpen = this.handleUserSelectionClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.onEnterChatroom = this.onEnterChatroom.bind(this);
        this.onLeaveChatroom = this.onLeaveChatroom.bind(this);
        this.getChatrooms = this.getChatrooms.bind(this);
    }

    componentDidMount() {
        console.log('comp did mount')
        this.getChatrooms()
    }

    getChatrooms() {
        const getChatroomsCallback = (err, chatrooms) => {
            this.setState({chatrooms})
        }
        this.state.client.getChatRooms(getChatroomsCallback)
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
    
    handleOnEnterChatroom = (chatroom) => {
        const onNoUserSelected = () => {
            this.setState({selectedChatroom: null})
        }
        const onEnterChatroomSuccess = (chatHistory) => {
            //TODO - push to history with router. Now pretty useless i guess since Chatroom should take care of actual chatHistory and displaying it
            console.log('Pushed history from server to ROOT state chatHistory: ', chatHistory)
            this.setState({
                chatHistory,
                selectedChatroom: chatroom
            })
        }

        this.onEnterChatroom(chatroom.name, onNoUserSelected, onEnterChatroomSuccess)
    }

    onEnterChatroom(chatroomName, onNoUserSelected, onEnterChatroomSuccess) {
        if(!this.state.user)
            return onNoUserSelected()
        const onEnterChatroomSuccessCallback = (err, chatHistory) => {
            if (err)
                return Error(err)
            return onEnterChatroomSuccess(chatHistory)
        }
        
        return this.state.client.join(chatroomName, onEnterChatroomSuccessCallback)
    }


    handleOnLeaveChatroom() {
        //TODO - properly with react router
        const onLeaveSuccess = () => {
            const lastChatroom = this.state.selectedChatroom;
            this.setState({
                selectedChatroom : null
            })
            console.log('Left chatroom: ', lastChatroom);
        }

        this.onLeaveChatroom(this.state.selectedChatroom, onLeaveSuccess)        
    }

    onLeaveChatroom(chatroom, onLeaveSuccess) {
        //TODO - fix error handling to make it DRY
        const onLeaveCallback = (err) => {
            if(err)
                return Error('Could not leave chatroom', err)
            return onLeaveSuccess()
        }
        this.state.client.leave(chatroom.name, onLeaveCallback)
    }

    handleRegister(user) {
        this.registerUser(user);
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
                chatHistory={this.state.chatHistory}
                registerHandler={this.state.client.registerHandler}
                unregisterHandler={this.state.client.unregisterHandler}
                onSendMessage={this.handleSendMessage}
                onLeave={this.handleOnLeaveChatroom}
            />
        )
    }

    showHome() {
        return (
            <React.Fragment>
                {!this.state.chatrooms
                    ? <Loader />
                    : (
                        <Home
                            chatrooms={this.state.chatrooms}
                            onEnterChatroom={this.handleOnEnterChatroom}
                        />
                    )
                }
            </React.Fragment>
        )
    }

    showUserSelection() {
        //Users are loading in background since we render but use open state to shof/hide it
        return (
            <UserSelection
                onClose={this.handleClose}
                onSelection={this.handleRegister}
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