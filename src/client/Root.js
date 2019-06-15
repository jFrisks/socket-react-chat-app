import React from 'react';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import MainLayout from './MainLayout';
import ChatroomPreview from './ChatroomPreview';
import Chatroom from './Chatroom';
import Loader from './Loader';

import chatroomImage from '../public/chatrooms/alexandria.jpg';
import userImage1 from '../public/users/carol.jpg';
import userImage2 from '../public/users/daryl.jpg';
import userImage3 from '../public/users/negan.jpeg';
import userImage4 from '../public/users/rick.jpg';



function Root() {

    const chatroom = {
        image: chatroomImage,
        name: "ALEXANDRIA"
    }

    const messages = [
        {
            user: "PERSON 1",
            message: "HEJSAN",
            img: userImage1,
        },
        {
            user: "PERSON 2",
            message: "BLÄBLÄ",
            img: userImage2,
        },
        {
            user: "PERSON 3",
            message: "BLÄBLÄ",
            img: userImage3,
        },
        {
            user: "PERSON 1",
            message: "SKIT PÅ DIG",
            img: userImage1,
        },
        {
            user: "PERSON 2",
            message: "HIHIHIH",
            img: userImage2,
        },
        {
            user: "PERSON 3",
            message: "SNYGGT SAGT!",
            img: userImage3,
        },
        {
            user: "PERSON 3",
            message: "BLÄBLÄ",
            img: userImage3,
        },
        {
            user: "PERSON 1",
            message: "SKIT PÅ DIG",
            img: userImage1,
        },
        {
            user: "PERSON 2",
            message: "HIHIHIH",
            img: userImage2,
        },
        {
            user: "PERSON 3",
            message: "SNYGGT SAGT!",
            img: userImage3,
        },
    ]

    return (
        <MuiThemeProvider>
            <MainLayout>
                <Chatroom chatroom={chatroom} messages={messages}></Chatroom>
                <ChatroomPreview></ChatroomPreview>
            </MainLayout>
        </MuiThemeProvider>
    )
}

export default Root;