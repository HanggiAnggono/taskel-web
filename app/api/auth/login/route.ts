import { axiosNoAuth, axiosServer } from '@/api/api-service'
import { HttpStatusCode } from "axios"
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  'use server'
  const reqBody = await request.json()

  try {
    const res = await axiosServer.post('/api/login', {
      username: reqBody.username,
      password: reqBody.password,
    })


    const data = res.data
    const cookieStore = cookies()
    console.log({token: data.token})
    cookieStore.set('token', data.token, {
      path: '/',
    })

    return new NextResponse(JSON.stringify(data), {
      status: HttpStatusCode.Ok
    })
  } catch (err) {
    return new NextResponse(JSON.stringify(err.response.data,), {
      status: HttpStatusCode.BadRequest
    })
  }
}
