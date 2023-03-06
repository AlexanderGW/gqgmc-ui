import type { NextApiRequest, NextApiResponse } from 'next'
// import { Server } from 'socket.io';
import { tail, tempdir } from 'shelljs'

const fs = require('fs/promises');

type Data = {
  date?: string,
  value?: string,
  error?: string,
}

export async function GET(
  request: Request
) {
  try {
    const data = await fs.readFile('/home/anon/projects/gqgmc-ui/cpm.log', { encoding: 'utf8' });
    // let now = new Date();
    // res.status(200).json({ date: now.toISOString(), value: str })
    return new Response(`date,value\n${data}`);
  } catch (err) {
    // res.status(500).send({ error: 'failed to fetch data' })
    return new Response('error')
  }

//   if (res.socket.server.io) {
//     console.log('Socket is already running')
//   } else {
//     console.log('Socket is initializing')
//     const io = new Server(res.socket.server)
//     res.socket.server.io = io
//   }
//   res.end()
}
