import type { NextApiRequest, NextApiResponse } from 'next'
// import { Server } from 'socket.io';
import { tail, tempdir } from 'shelljs'

type Data = {
  date?: string,
  value?: string,
  error?: string,
}

function randomIntFromInterval(min: number, max: number): number { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export async function GET(
  request: Request
) {
  try {
    let cpm = randomIntFromInterval(15,30);
    let now = new Date();
    let secs: string = now.getSeconds().toString();
    if (secs.length == 1)
      secs = `0${secs}`;
    let hour = randomIntFromInterval(0,11);
    let fakeHour: string = hour.toString();
    if (fakeHour.length == 1)
      fakeHour = `0${hour}`;

    return new Response(`date,value\n2023-03-07T${fakeHour}:${secs}:00,CPM:${cpm}\n`);
  } catch (err) {
    // res.status(500).send({ error: 'failed to fetch data' })
    return new Response('error')
  }
}
