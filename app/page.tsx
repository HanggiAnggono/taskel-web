import { cookies } from 'next/headers'
import Image from 'next/image'

type Task = {
  ID: number
  Title: string
  Description: string
  Status: 'todo' | 'inprogress' | 'done'
  UserID: number | null
  User: null
  Watchers: null | []
  CreatedAt: string
  UpdatedAt: string
}

type TaskListResponse = {
  data: Task[]
  message: string
  status: string
}

export default async function Home() {
  const getData = async () => {
    const cookie = cookies().toString()
    const res = await fetch('http://localhost:8080/api/task/list', {
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie,
      },
    })
    const data = await res.json()
    return data as TaskListResponse
  }

  const { data } = await getData()
  console.log(JSON.stringify(data, null, 2))

  return (
    <main>
      <div className="p-5">
        <h1 className="text-xl mb-5">Tasks</h1>

        <table className="w-full">
          <thead className="border-b-2 border-gray-500">
            <th>Title</th>
            <th>Description</th>
          </thead>
          <tbody>
            {data.map((task) => {
              return (
                <tr
                  key={task.ID}
                  className="hover:bg-blue-500 hover:text-white"
                >
                  <td className="p-3">{task.Title}</td>
                  <td className="p-3">{task.Description}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </main>
  )
}
