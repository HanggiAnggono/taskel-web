import { API_BASE_URL } from '@/api/api-service'
import { Task } from '@/types/task'
import { IcUserCircle } from '@/ui/icons/IcUserCircle'
import TaskDescriptionField from '@/ui/tasks/TaskDescriptionField'
import { TaskDetailSidebar } from '@/ui/tasks/TaskDetailSidebar'
import { cookies } from 'next/headers'

export default async function TaskPage({
  params,
}: {
  params: { key: string }
}) {
  const { key: key } = params
  const getData = async () => {
    const cookie = cookies().toString()
    const res = await fetch(`${API_BASE_URL}/api/task/${key}`, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie,
      },
    })
    const data = await res.json()
    return data
  }

  const { data }: { data: Task } = await getData()

  return (
    <div className="p-5">
      <h1 className="text-2xl">{data.Title}</h1>
      <div className="flex ml-auto mb-10">
        <div className="w-7/12">
          <div className="hover:bg-gray-50">
            <TaskDescriptionField
              description={data.Description}
              taskKey={data.Key}
            />
          </div>
        </div>
        <div className="w-5/12">
          <TaskDetailSidebar data={data} />
        </div>
      </div>
      <div className="bg-gray-50 p-2">
        <h1 className="text-2xl">Comments</h1>
        <div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex mb-4">
              <div className="mr-3">
                <IcUserCircle className="w-8" />
              </div>
              <div>
                <span>Hanggi Anggono {new Date().toLocaleString()} </span>
                <p>
                  This Task has been started previously but need some works now
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
