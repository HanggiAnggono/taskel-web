'use client'

import { useApi } from '@/api/api-service'
import { Task, User } from '@/types/task'
import React from 'react'
import { SelectOptions } from '../components/SelectOptions'

const options = [
  { value: 'todo', label: 'To Do' },
  { value: 'inprogress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
]

export function TaskDetailSidebar({ data }: { data: Task }) {
  const [{ loading, error, response }, mutate] = useApi(
    {
      method: 'POST',
      url: `/api/task/${data.Key}/transition`,
      withCredentials: true,
    },
    {
      manual: true,
    }
  )

  const [assignM, assign] = useApi(
    {
      method: 'PUT',
      url: `/api/task/${data.Key}/edit`,
      withCredentials: true,
    },
    {
      manual: true,
    }
  )

  const [user] = useApi({
    method: 'GET',
    url: `/api/user/list?pageSize=100`,
    withCredentials: true,
  })
  const users =
    user.data?.data?.map((u: User) => {
      return { value: u.ID, label: u.Name }
    }) || []

  function handleChangeStatus(value: any) {
    mutate({ data: { status: value.value } })
  }

  function handleChangeUser(value: any) {
    if (!value) return
    assign({ data: { userId: value.value } })
  }

  return (
    <div className="border-2 border-gray-700 rounded-md p-3">
      <div className="mb-3">
        <div className="text-sm">Status:</div>
        <div>
          <SelectOptions
            defaultValue={options.find((o) => o.value === data.Status)}
            className="w-10"
            options={options}
            onChange={handleChangeStatus}
            isLoading={loading}
            styles={{
              control: (base, props) => {
                const value = props.getValue().at(0)?.value
                let backgroundColor = undefined
                switch (value) {
                  case 'inprogress':
                    backgroundColor = '#00eeee'
                    break
                  case 'done':
                    backgroundColor = '#00ee00'
                    break
                }

                return {
                  ...base,
                  backgroundColor,
                }
              },
            }}
          />
        </div>
      </div>
      <div className="">
        <div className="text-sm">Assignee:</div>
        <div>
          {!user.loading && (
            <SelectOptions
              defaultValue={
                user.loading
                  ? undefined
                  : users.find((o) => o.value === data.UserID)
              }
              options={users}
              isLoading={assignM.loading}
              onChange={handleChangeUser}
            />
          )}
        </div>
      </div>
    </div>
  )
}
