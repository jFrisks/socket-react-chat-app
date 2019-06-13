import React from 'react';
import styled from 'styled-components'

import Divider from '@material-ui/core/Divider';
import { List, ListItem } from '@material-ui/core/List';

import Overlay from './Overlay';
import Button from '@material-ui/core/Button';

const ChatWindow = styled.div`
    position: relative;
    display: inline-flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    width: 520px;
    box-sizing: border-box;
`

const ChatroomImage = styled.img`
    position: absolute;
    top: 0;
    width: 100%;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 20px;
    z-index: 1;
    color: #fafafa !important;
    border-bottom: 1px solid;
`

const Title = styled.p`
    text-align: center;
    font-size: 24px;
`

export default class Chatroom extends React.Component {
    

    render() {
        return(
            <div style={{ height: '100%' }}>
                <ChatWindow>
                    <Header>
                        <Title>
                            Chatroom name
                        </Title>
                        <Button variant="outlined" color="primary">
                            Close
                        </Button>
                    </Header>
                    <ChatroomImage src="public/chatrooms/alexandria.jpg"/>
                </ChatWindow>
            </div>
        );
    }
}