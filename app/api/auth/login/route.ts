import { axiosNoAuth, axiosServer } from '@/api/api-service'
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

    const data = await res.data
    const cookieStore = cookies()
    cookieStore.set('token', data.token, {
      path: '/',
    })

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json(err.response.data, { status: 400 })
  }
}
