'use client'

import { useApi } from '@/api/api-service'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { SelectOptions } from "../components/SelectOptions"
import { User } from "@/types/task"
import { SuccessResponse } from "@/types/service"

type CreateTaskFormValues = {
  title: string
  status: string
  description: string
  userId: number
}

export const CreateTaskForm = () => {
  const { register, handleSubmit, reset } = useForm<CreateTaskFormValues>()
  const [{ loading }, createTask] = useApi<
    any,
    CreateTaskFormValues,
    CreateTaskFormValues
  >({ url: '/api/task', method: 'post', withCredentials: true }, { manual: true })

  const [users] = useApi<SuccessResponse<User[]>>({
    method: 'GET',
    url: `/api/user/list?pageSize=100`,
    withCredentials: true,
  })

  const onSubmit = (values: CreateTaskFormValues) => {
    createTask({
      data: {
        title: values.title,
        description: values.description,
        status: 'todo',
        userId: 3,
      },
    })
  }

  return (
    <div style={{ width: '70vw' }}>
      <form className="pt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <div>
            <label>Title *</label>
          </div>
          <textarea {...register('title')} className="w-full" required />
        </div>
        <div className="mb-5">
          <div>
            <label>User</label>
          </div>
          <SelectOptions
            // defaultValue={options.find((o) => o.value === data.Status)}
            className="w-full"
            options={users?.data?.data?.map(user => {
              return {label: user.Username, value: user.ID}
            })}
            // onChange={handleChangeStatus}
            // isLoading={loading}
          />
        </div>
        <div>
          <div>
            <label>Description</label>
          </div>
          <textarea {...register('description')} rows={10}></textarea>
        </div>
        <div className="flex">
          <button
            type="submit"
            className="btn btn-primary ml-auto"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}
