import React from 'react';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import MainLayout from './MainLayout';
import ChatroomPreview from './ChatroomPreview';
import Chatroom from './Chatroom';
import Home from './Home';
import Loader from './Loader';
import Socket from './socket';

import users from '../config/users'
import chatroomImage from '../public/chatrooms/alexandria.jpg';
import chatroomImage2 from '../public/chatrooms/hilltop.jpg';
import chatroomImage3 from '../public/chatrooms/sanctuary.jpg';
import chatroomImage4 from '../public/chatrooms/terminus.jpg';
import userImage1 from '../public/users/carol.jpg';
import userImage2 from '../public/users/daryl.jpg';
import userImage3 from '../public/users/negan.jpeg';
import userImage4 from '../public/users/rick.jpg';
import socket from './socket';

const chatrooms = [
    {
        name: "ALEXANDRIA",
        image: chatroomImage,
    },
    {
        name: "ÅLAND",
        image: chatroomImage2,
    },
    {
        name: "SVERIGE",
        image: chatroomImage3,
    },
    {
        name: "USA",
        image: chatroomImage4,
    }
]

const messages = [
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
]

class Root extends React.Component {
    constructor(props, context){
        super(props);

        this.state = {
            client: socket(),
            user: null,
            chatrooms: chatrooms,
            selectedChatroom: null,
        }
    }
    
    showChatroom() {
        return (
            <Chatroom
                chatroom={this.state.selectedChatroom}
                messages={messages}
                registerHandler={this.state.client.registerHandler}
                unregisterHandler={this.state.client.unregisterHandler}
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

    handleChatroomClick(clickedRoom, e) {
        this.setState({
            selectedChatroom : clickedRoom
        });
        console.log('Clicked and selected chatroom', clickedRoom)
    }

    isUserAndChatroomSelected() {
        const {selectedChatroom, user} = this.state;
        if(selectedChatroom && user) 
            return true;
        else
            return false;
    }

    render() {
        return (
            <MuiThemeProvider>
                <MainLayout>
                    {this.isUserAndChatroomSelected() ? this.showChatroom() : this.showHome() }
                </MainLayout>
            </MuiThemeProvider>
        )
    }
    
}

export default Root;