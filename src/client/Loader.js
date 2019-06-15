import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loader(props){
        return(
            <div>
                <CircularProgress color="secondary" />
            </div>
        );
}