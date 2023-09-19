'use client';

import { useEffect, useState } from "react";
import API from "../API";
import { pusherSever } from "../libs/pusher";


import getToken from "../libs/getToken";
import axios from "axios";

import useActiveChannel from "../hooks/useActiveChannel";

function ActiveStatus() {
  useActiveChannel();
  return null;
}

export default ActiveStatus