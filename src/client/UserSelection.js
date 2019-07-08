import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, Avatar} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogActions from '@material-ui/core/DialogActions';

import users from '../config/users';

function ChooseAvatarDialog(props) {
    const {onClose, selectedUser, ...other} = props;

    const isUserSelected = (user) => {
        if(user === selectedUser) return true;
        else return false
    }

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
                    <ListItem button selected={isUserSelected(user)} onClick={() => handleListUserClick(user)} key={user}>
                        <ListItemAvatar>
                            <Avatar src={user.image}/>
                        </ListItemAvatar>
                        <ListItemText primary={user.name + ' ' + user.lastName}/>
                    </ListItem>
                ))}
            </List>
            <DialogActions onClick={handleClose}>
                <Button>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ChooseAvatarDialog;