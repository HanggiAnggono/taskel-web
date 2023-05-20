import { axiosServer } from '@/api/api-service'
import { Task } from '@/types/task'
import { NextResponse } from 'next/server'

type EditRequest = {
  title: string
  status: Task['Status']
  description: string
  userId: Task['UserID']
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const reqBody: EditRequest = await request.json()
  const id = params.id

  try {
    const res = await axiosServer.put(`/api/task/${id}/edit`, reqBody, {
      headers: { cookie: request.headers.get('cookie') },
    })

    const data = await res.data

    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json(err.response.data, { status: 400 })
  }
}
