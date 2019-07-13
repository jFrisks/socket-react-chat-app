import React from 'react';
import styled from 'styled-components';
import Fullscreen from './Fullscreen';
import Overlay from './Overlay';
import Avatar from '@material-ui/core/Avatar';

import FaceIcon from '@material-ui/icons/Face';

import BGImage from '../public/background.jpg'

const ContentWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: auto;
  z-index: 1;
`
const Center = styled.div`
  position: relative;
  max-width: 1000px;
  margin: auto;
  padding: 40px 0;
  height: 100%;
  box-sizing: border-box;
`
const Content = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 20px;
  height: 100%;
`
const Relative = styled.div`
  position: relative;
`

const Sticky = styled.div`
  position: fixed;
`
const AvatarWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    text-decoration: none;
  }
  img {
    box-shadow: rgba(255, 255, 255, 0.2) 0 0 10px 2px;
  }
  .avatar {
    height: 100px;
    width: 100px;
  }

  .avatar-icon {
    font-size: 100px;
  }
`
const BackgroundImage = styled.div`
  background: url(${props => props.src}) no-repeat center center fixed;
  background-size: cover;
  height: 100%;
  overflow: hidden;
`
const UserName = styled.p`
  font-size: 24px;
  height: 27px;
  text-align: center;
  color: #fafafa;
`


function fullName(user) {
  console.log('trying to write fullname of user with image: ', user)
  return user ? `${user.name} ${user.lastName}` : 'Who are you?'
}

function renderAvatar(user) {
  const avatarProps = user
    ? {src: user.image }
    : {children: (<FaceIcon className='avatar-icon' />)}
  return <Avatar className='avatar' {...avatarProps}/>
}


function MainLayout(props) {

  /*
  function handleGetAvailableUsers(callback) {
    console.log('temp handling of get avaialble users')
    callback(null, users);
  }
  */

  return (
    <Fullscreen>
      <ContentWrapper>
        <Center>
          <Content>
            <Relative>
              <Sticky>
                <AvatarWrapper onClick={props.onUserSelectionClick} >
                  {renderAvatar(props.user)}
                  <UserName> { fullName(props.user) } </UserName>
                </AvatarWrapper>
              </Sticky>
            </Relative>
            { props.children }
          </Content>
        </Center>
      </ContentWrapper>
      <Fullscreen>
        <BackgroundImage src={BGImage}></BackgroundImage>
        <Overlay opacity="0.5" background="#EDAF05">
        </Overlay>
      </Fullscreen>
    </Fullscreen>
  );
}

export default MainLayout;
