import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle} from 'material-ui';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

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

    return (
        <Dialog onClose={handleClose} >
            <DialogTitle>Choose User</DialogTitle>
            <List>
                {users.map((user) => (
                    <ListItem>
                        <ListItemText primary={user.name}/>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

export default ChooseAvatarDialog;