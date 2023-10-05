import Pusher from 'pusher-js'


import getToken from './getToken'

const {token} = getToken();


export const pusherSever =  new Pusher(
  process.env.NEXT_PUBLIC_PUSHER_KEY, {
    authEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/test/`,
    cluster: 'ap1',
    auth:{
      headers :{
        authorization: `Bearer ${token}`
      }
    },
  }
)


export const pusherClient = new Pusher(
  process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: 'ap1'
  }
)