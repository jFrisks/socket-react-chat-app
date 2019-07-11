import React from 'react';
import styled from 'styled-components'

import CircularProgress from '@material-ui/core/CircularProgress';

const Center = styled.div`
    margin: auto;
`


export default function Loader(props){
        return(
            <Center>
                <CircularProgress color="secondary" />
            </Center>
        );
}