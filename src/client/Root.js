import React from 'react';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import MainLayout from './MainLayout';
import Chatroom from './Chatroom';
import Home from './Home';
import Loader from './Loader';
import UserSelection from './UserSelection';

import socket from './socket';

class Root extends React.Component {
    constructor(props, context){
        super(props);

        this.state = {
            client: socket(),
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
        this.handleIsTyping = this.handleIsTyping.bind(this);
    }

    componentDidMount() {
        console.log('comp did mount')
        this.getChatrooms()
    }

    getChatrooms() {
        const getChatroomsCallback = (err, chatrooms) => {
            console.log('got chatrooms from server: ', chatrooms)
            this.setState({chatrooms})
        }
        this.state.client.getChatRooms(getChatroomsCallback)
    }

    handleUserSelectionClickOpen(){
        if(this.state.selectedChatroom)
            return
        this.setState({
            userSelectionOpen: true
        }, () => console.log('handledClick. UserSel is open: ', this.state.userSelectionOpen))
    }
  
    handleClose() {
        this.setState({userSelectionOpen : false})
    }
    
    handleOnEnterChatroom = (chatroom) => {
        const onNoUserSelected = () => {
            console.log('no user is selected', this.state.user)
            this.setState({selectedChatroom: null})
        }
        const onEnterChatroomSuccess = (chatHistory) => {
            //TODO - push to history with router. Now pretty useless i guess since Chatroom should take care of actual chatHistory and displaying it
            console.log('Entered Correctly and will show chatHistory: ', chatHistory)
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
        console.log('Client is handling user Register')
        this.registerUser(user);
    }

    registerUser(userToRegister) {
        //TODO - connect to server. Also look if we should replace isRegisterInProcess with userSelectionOpen
        //callback after user has been registred
        const onRegisterResponse = (user) => this.setState({userSelectionOpen : false, user})
        const onRegisterCallback = (err, user) => {
            //handle errors otherwise return user. Or, you could also most likely assume user is null or user and do one onRegisterResponse call
            //TODO - remove return statements
            if (err) {
                console.error('got error from server when registering: ', err)
                return onRegisterResponse(null)
            }
            else return onRegisterResponse(user)
        }

        console.log('calling client to server to handle Register')
        this.setState({userSelectionOpen : true})
        this.state.client.register(userToRegister.name, onRegisterCallback)
    }

    handleSendMessage(message, callback) {
        console.log(`locally handling message ${message} in chatroom ${this.state.selectedChatroom.name}`)
        this.state.client.message(
            this.state.selectedChatroom.name,
            message,
            callback
        );
    }

    handleIsTyping(chatroomName, isTyping){
        const isTypingCallback = (err) => {
            if(err) {
                console.error('got this error from server when sending user is typing: ', err)
            }
        }
        this.state.client.isTyping(this.state.selectedChatroom.name, isTyping, isTypingCallback)
    }

    isUserAndChatroomSelected() {
        if(this.state.selectedChatroom && this.state.user) 
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
                onIsTyping={this.handleIsTyping}
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
            <React.Fragment>
                {!this.state.userSelectionOpen
                    ? <React.Fragment />
                    : (
                        <UserSelection
                            onClose={this.handleClose}
                            onSelection={this.handleRegister}
                            open
                            selectedUser={this.state.user}
                            getAvailableUsers={this.state.client.getAvailableUsers}
                        />
                    )
                }
            </React.Fragment>
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