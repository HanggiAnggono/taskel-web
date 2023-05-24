import { API_BASE_URL, axiosServer } from '@/api/api-service'
import { Comment } from '@/types/comment'
import { Task } from '@/types/task'
import { Comments } from '@/ui/components/Comments'
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
    const res = await axiosServer.get(`/api/task/${key}`, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie,
      },
    })
    return res?.data
  }

  const getComments = async ({ id }: { id: number }) => {
    const res = await axiosServer.get(`/api/comments/list?pageSize=100`, {
      headers: { cookie: cookies().toString() },
      params: {
        commentable_type: 'tasks',
        commentable_id: id,
      },
    })

    return res?.data
  }

  const { data }: { data: Task } = await getData()
  const { data: comments }: { data: Comment[] } = await getComments({
    id: data.ID,
  }).catch(() => [])

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
        <Comments
          commentableId={data.ID}
          commentableType="tasks"
          comments={comments}
        />
      </div>
    </div>
  )
}
