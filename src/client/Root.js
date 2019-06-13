import React from 'react';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import MainLayout from './MainLayout';
import ChatroomPreview from './ChatroomPreview';
import Chatroom from './Chatroom';

function Root() {
    return (
        <MuiThemeProvider>
            <MainLayout>
                <Chatroom></Chatroom>
            </MainLayout>
        </MuiThemeProvider>
    )
}

export default Root;