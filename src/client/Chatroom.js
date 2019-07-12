import React from 'react';
import styled from 'styled-components'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import { List, ListItem, ListItemAvatar, ListItemText} from '@material-ui/core';

import Overlay from './Overlay';

import userImage1 from '../public/users/carol.jpg';

const ChatWindow = styled.div`
    background-image: url(${props => props.bgImage});
    background-size: cover;
    background-position: center;
    position: relative;
    display: inline-flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    width: 520px;
    box-sizing: border-box;
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

    constructor(props){
        super(props);

        this.panel = React.createRef();

        const { chatHistory } = props;

        this.state = {
            input: '',
            chatHistory,
        }

        this.onSendMessage = this.onSendMessage.bind(this);
        this.updateChatHistory = this.updateChatHistory.bind(this);
        this.onMessageReceived = this.onMessageReceived.bind(this);
    }

    componentDidMount(){
        //Handle register - add user, show log in message and so on
        this.props.registerHandler(this.onMessageReceived)
        this.scrollToChatBottom();
    }
    componentDidUpdate(){
        this.scrollToChatBottom();
    }
    componentWillUnmount(){
        //Handle unregister
        this.props.unregisterHandler()
    }

    onInputChange = (e) => {
        this.setState({
            input: e.target.value,
        });
    }

    onSendMessage() {
        const message = this.state.input;
        const serverGotMessageCallback = (err) => {
            if (err)
                return console.error(err);
            return this.setState({
                input: ''
            })
        }

        if (!this.state.input)
            return
        this.props.onSendMessage(this.state.input, serverGotMessageCallback)

        //TODO - TEMPORARY BELOW - adding message to chat 
        const newMessage = {
            user: this.props.user.name,
            message,
            img: userImage1,
            key: this.props.user.name+'12'+message,
        }
        this.updateChatHistory(newMessage)
    }

    onMessageReceived(messageEntry) {
        console.log('onMessagedReceived: ', messageEntry);
        this.updateChatHistory(messageEntry);
    }

    updateChatHistory(messageEntry) {
        this.setState({
            chatHistory: this.state.chatHistory.concat(messageEntry)
        });
    }

    scrollToChatBottom() {
        this.panel.current.scrollTo(0, this.panel.current.scrollHeight)
    }

    
    showAllMessages(messages){
        //FUTURE - could add conditional rendering of different types of messages. Normal message, login message, log out...
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
                <ChatWindow bgImage={this.props.chatroom.image}>
                    <Header>
                        <Title>
                            {this.props.chatroom.name}
                        </Title>
                        <Button variant="contained" color="secondary" onClick={this.props.onLeave} >
                            Close
                        </Button>
                    </Header>
                    <ChatPanel>
                        <Scrollable ref={this.panel}>
                            {this.showAllMessages(this.state.chatHistory)}
                        </Scrollable>
                        <InputPanel>
                        <Input
                            id="message-input"
                            placeholder="Enter a message..."
                            onChange={this.onInputChange}
                            value={this.state.input}
                            onKeyPress={e => (e.key === 'Enter' ? this.onSendMessage() : null)}
                            autoComplete='off'
                            inputProps={{
                            'aria-label': 'Description',
                            }}
                        />
                        <Fab component="button" variant="extended" aria-label="Delete" onClick={this.onSendMessage}>
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