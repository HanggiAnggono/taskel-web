import { axiosServer } from '@/api/api-service'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const resp = await axiosServer.get('/api/user/list', {
      headers: {
        cookie: request.headers.get('cookie'),
      },
    })
    return NextResponse.json(resp.data, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(error.response?.data, { status: 400 })
  }
}
