import { API_BASE_URL, axiosServer } from '@/api/api-service'
import { Comment } from '@/types/comment'
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
    const res = await axiosServer.get(`${API_BASE_URL}/api/task/${key}`, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie,
      },
    })
    return res?.data
  }

  const getComments = async ({ id }: { id: number }) => {
    const res = await axiosServer.get(`/api/comments/list`, {
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
        <div>
          {comments.map((comment) => (
            <div key={comment.ID} className="flex mb-4">
              <div className="mr-3">
                <IcUserCircle className="w-8" />
              </div>
              <div>
                <span>
                  {comment.Author?.Name}{' '}
                  <span className="text-gray-400">
                    {new Date(comment.CreatedAt)?.toLocaleString?.()}
                  </span>{' '}
                </span>
                <p>{comment.Comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
