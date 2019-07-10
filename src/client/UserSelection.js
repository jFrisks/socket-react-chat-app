import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, Avatar} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogActions from '@material-ui/core/DialogActions';

import users from '../config/users'
import Loader from './Loader';

class ChooseAvatarDialog extends React.Component {

    constructor(props) {
        super(props);

        /*
        this.state = {
            availableUsers: null,
        }

        
        this.props.getAvailableUsers((err, availableUsers) => {
            this.setState({availableUsers})
        })
        */
        this.renderUserListItems = this.renderUserListItems.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleListUserClick = this.handleListUserClick.bind(this);
        this.isUserSelected = this.isUserSelected.bind(this);
    }
    //props.getAvailableUsers((err, users) => setAvailableUsers(users))

    isUserSelected = (user) => {
        if(user === this.props.selectedUser) return true;
        else return false
    }

    handleClose() {
        this.props.onClose(this.props.selectedUser)
    }

    handleListUserClick(user) {
        this.props.onClose(user)
    }

    renderUserListItems() {
        return this.props.availableUsers.map((user) => (
            <ListItem button selected={this.isUserSelected(user)} onClick={() => this.handleListUserClick(user)} key={user.name}>
                <ListItemAvatar>
                    <Avatar src={user.image}/>
                </ListItemAvatar>
                <ListItemText primary={user.name + ' ' + user.lastName}/>
            </ListItem>
        ))
    }

    render() {
        return (
            <Dialog onClose={this.handleClose} open={this.props.open}>
                <DialogTitle>Choose User</DialogTitle>
                    {!this.props.availableUsers
                        ?   <Loader /> 
                        : (
                            <List>
                                {this.renderUserListItems()}
                            </List>
                        )
                    }
                <DialogActions onClick={this.handleClose}>
                    <Button>Close</Button>
                </DialogActions>
            </Dialog>
        );    
    }
}

export default ChooseAvatarDialog;