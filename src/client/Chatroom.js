import React from 'react';
import styled from 'styled-components'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import { List, ListItem, ListItemAvatar, ListItemText} from '@material-ui/core';

import Overlay from './Overlay';

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

const ChatPanel = styled.div`
    position: relative;
    display: inline-flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    z-index: 1;
`

const InputPanel = styled.div`
    display: flex;
    align-items: center;
    align-self: center;
    padding: 20px;
    border-top: 1px solid #fafafa;
`

const Scrollable = styled.div`
    height: 100%;
    overflow: auto;
`

const OutputText = styled.div`
  white-space: normal !important;
  word-break: break-all !important;
  overflow: initial !important;
  width: 100%;
  height: auto !important;
  color: #fafafa !important;
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

    handleSendClick(message) {
        console.log("message was sent: ", message)
        alert("Hejsvejs")
    }
    
    showAllMessages(messages){
        return(
            <List>
                {messages.map(message => (
                    <ListItem alignItems="flex-start" key={message.key}>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={message.img} />
                        </ListItemAvatar>
                        <ListItemText 
                            primary={
                                <OutputText>
                                    {message.user}
                                </OutputText>
                            }
                            secondary={
                                <OutputText>
                                    {message.message}
                                </OutputText>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        );
        
    }


    render() {
        return(
            <div style={{ height: '100%' }}>
                <ChatWindow>
                    <Header>
                        <Title>
                            {this.props.chatroom.name}
                        </Title>
                        <Button variant="contained" color="secondary" >
                            Close
                        </Button>
                    </Header>
                    <ChatroomImage src={this.props.chatroom.image}/>
                    <ChatPanel>
                        <Scrollable>
                            {this.showAllMessages(this.props.messages)}
                        </Scrollable>
                        <InputPanel>
                        <TextField
                            id="message-input"
                            label="Enter a message"
                            placeholder="Enter a message"
                            margin="normal"
                            onKeyPress={e => (e.key === 'Enter' ? this.handleSendClick() : null)}
                        />
                        <Fab component="button" variant="extended" aria-label="Delete" onClick={() => this.handleSendClick("TEST")}>
                            <SendIcon />
                            Send
                        </Fab>
                        </InputPanel>
                    </ChatPanel>
                    <Overlay opacity={0.6} background="#111111" />
                </ChatWindow>
            </div>
        );
    }
}