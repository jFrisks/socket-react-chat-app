import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, Avatar} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import AddIcon from '@material-ui/icons/Add';

const users = [
    {name: 'Carol'},
    {name: 'Daryl'},
    {name: 'Negan'},
    {name: 'Rick'}
]

function ChooseAvatarDialog(props) {
    const {onClose, selectedUser, ...other} = props;

    function handleClose() {
        onClose(selectedUser)
    }

    function handleListUserClick(value) {
        onClose(value)
    }

    return (
        <Dialog onClose={handleClose} {...other}>
            <DialogTitle>Choose User</DialogTitle>
            <List>
                {users.map((user) => (
                    <ListItem onClick={() => handleListUserClick(user)} key={user}>
                        <ListItemAvatar>
                            <Avatar>
                                <AddIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={user.name}/>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

export default ChooseAvatarDialog;