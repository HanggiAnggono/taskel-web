import { SelectOptions } from '@/ui/components/SelectOptions'
import { IcUserCircle } from '@/ui/icons/IcUserCircle'
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
    const res = await fetch(`http://localhost:8080/api/task/${key}`, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie,
      },
    })
    const data = await res.json()
    return data
  }

  const { data } = await getData()
  console.log(JSON.stringify(data, null, 2))

  return (
    <div className="p-5">
      <h1 className="text-2xl">{data.Title}</h1>
      <div className="flex ml-auto mb-10">
        <div className="w-7/12">
          <div className="hover:bg-gray-50">
            <p>
              {data.Description ||
                'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident ad doloremque labore quibusdam dolorum commodi, perferendis hic sint reiciendis laborum omnis, similique maxime voluptatem dolor corrupti. Excepturi enim ducimus blanditiis.'}
            </p>
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
