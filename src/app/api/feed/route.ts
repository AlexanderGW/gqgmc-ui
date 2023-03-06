import type { NextApiRequest, NextApiResponse } from 'next'
// import { Server } from 'socket.io';
import { tail, tempdir } from 'shelljs'

type Data = {
  date?: string,
  value?: string,
  error?: string,
}

export async function GET(
  request: Request
) {
  try {
    return new Response(`${Date.now()},CPM:50\n`);
  } catch (err) {
    // res.status(500).send({ error: 'failed to fetch data' })
    return new Response('error')
  }
}
