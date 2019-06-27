import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, Avatar} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';


import userImage from '../public/users/carol.jpg';
import users from '../config/users';

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
                    <ListItem button onClick={() => handleListUserClick(user)} key={user}>
                        <ListItemAvatar>
                            <Avatar src={userImage}/>
                        </ListItemAvatar>
                        <ListItemText primary={user.name + ' ' + user.lastName}/>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

export default ChooseAvatarDialog;