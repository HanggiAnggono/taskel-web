import { API_BASE_URL } from '@/api/api-service'
import { Task } from '@/types/task'
import { cookies } from 'next/headers'
import Link from 'next/link'

type TaskListResponse = {
  data: Task[]
  message: string
  status: string
}

export default async function Home() {
  const getData = async () => {
    const cookie = cookies().toString()
    const res = await fetch(`${API_BASE_URL}/api/task/list?pageSize=100`, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie,
      },
    })
    const data = await res.json()
    return data as TaskListResponse
  }

  const { data = [] } = await getData()

  return (
    <main>
      <div className="p-5">
        <h1 className="text-xl mb-5">Tasks</h1>

        <table className="w-full">
          <thead className="border-b-2 border-gray-500">
            <th align="left">Title</th>
            <th align="left">Assignee</th>
            <th align="left">Status</th>
          </thead>
          <tbody>
            {data.map((task) => {
              return (
                <tr key={task.ID} className="hover:bg-blue-50">
                  <td className="p-3">
                    <Link href={`/task/${task.Key}`}>{task.Title}</Link>
                  </td>
                  <td className="p-3">
                    <Link href={`/user/${task.UserID}`}>{task.User?.Name}</Link>
                  </td>
                  <td className="p-3">{task.Status?.toUpperCase()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </main>
  )
}
