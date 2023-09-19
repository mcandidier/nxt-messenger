import { NextApiRequest, NextApiResponse } from "next"

import { pusherClient } from "@/app/libs/pusher";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


import API from "@/app/API";

export default async function handler(
  request,
  response
) {

  const getUser = async () => {
    const resp = await API.get('accounts/user/')
    const data = await resp.data;
    return data;
  }

  const user = await getUser();

  if (!user) {
    return response.status(401);
  }


  
  const socketId = request.body.socket_id;
  const channel = request.body.channel_name;
  const data = {
    user_id: user.email,
  };


  console.log(socketId)
  
  console.log(channel)
  console.log(data)

  const authResponse = pusherClient.authorizeChannel(socketId, channel, data);
  return response.send(authResponse);
};