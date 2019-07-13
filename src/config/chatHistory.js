import users from './users'

const user1 = users[0];
const user2 = users[1];

export default [
    {
        user: user1,
        message: '',
        event: 'Logged In'
    },
    {
        user: user1,
        message: 'Hey Everybody!',
        event: 'Sent'
    },
    {
        user: user2,
        message: 'Hey you!',
        event: 'Sent'
    }
  ]
  
  