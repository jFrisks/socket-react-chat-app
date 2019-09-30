import React from 'react';

import ChatroomPreview from './ChatroomPreview';
import { Button } from '@material-ui/core';

export default ({
    chatrooms,
    onEnterChatroom
}) => (
    <div>
        {chatrooms ? (
            chatrooms.map(chatroom => (
                <ChatroomPreview 
                    key={chatroom.name}
                    chatroom={chatroom}
                    onEnter={onEnterChatroom}
                />
            ))
        ) : (
            <Button onClick={() => window.open('https://socket-chat-app-server-jfrisks.herokuapp.com/', '_blank')}>Start global server</Button>
        )}
    </div>
)