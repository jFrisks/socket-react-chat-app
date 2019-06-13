import React from 'react';
import styled from 'styled-components';

import Card from '@material-ui/core/Card';
import { CardMedia, CardContent, CardActionArea } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import chatrooms1 from '../public/chatrooms/alexandria.jpg';
import chatrooms2 from '../public/chatrooms/hilltop.jpg';
import chatrooms3 from '../public/chatrooms/sanctuary.jpg';
import chatrooms4 from '../public/chatrooms/terminus.jpg';

const ChatroomWrapper = styled.section`
    background-color: #123EDF;
    width: 70%;
    min-width: 250px;
`

let cards = [
    {title: 'Room 1', text: 'Lizards do that and that', img: chatrooms1},
    {title: 'Room 2', text: 'Dont do it', img: chatrooms2},
    {title: 'Room 3', text: 'Lizards do that and that', img: chatrooms3},
    {title: 'Room 4', text: 'Lizards do that and that', img: chatrooms4},
]

function ChatroomPreview(props) {
    const fullCards = cards.map((cards, key) =>
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={cards.img}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {cards.title}
                    </Typography>
                    <Typography component="p">
                        {cards.text}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );

    return (
        <ChatroomWrapper padding>
            {fullCards}
        </ChatroomWrapper>
    )
}

export default ChatroomPreview;