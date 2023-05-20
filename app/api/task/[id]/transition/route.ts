import { axiosServer } from '@/api/api-service'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  'use server'
  const reqBody = await request.json()
  const id = params.id

  try {
    const res = await axiosServer.post(
      `/api/task/${id}/transition`,
      {
        status: reqBody.status,
      },
      {
        headers: { cookie: request.headers.get('cookie') },
      }
    )

    const data = await res.data

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json(err.response.data, { status: 400 })
  }
}
