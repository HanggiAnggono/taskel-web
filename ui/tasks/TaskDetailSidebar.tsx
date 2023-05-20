'use client'

import { useApi } from '@/api/api-service'
import { Task } from "@/types/task"
import React from 'react'
import { SelectOptions } from '../components/SelectOptions'

const options = [
  { value: 'todo', label: 'To Do' },
  { value: 'inprogress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
]

export function TaskDetailSidebar({ data }: { data: Task }) {
  const [{ loading, error, response }, mutate] = useApi(
    { method: 'POST', url: `/api/task/${data.Key}/transition`, withCredentials: true },
    {
      manual: true,
    }
  )

  function handleChange(value: any) {
    mutate({ data: { status: value.value } })
    }

  return (
    <div className="border-2 border-gray-700 rounded-md p-3">
      <div className="flex items-center mb-3">
        <span className="mr-3">Status:</span>
        <span>
          <SelectOptions
            defaultValue={options.find((o) => o.value === data.Status)}
            className="w-36"
            options={options}
            onChange={handleChange}
            isLoading={loading}
            styles={{
              control: (base, props) => {
                const value = props.getValue().at(0)?.value
                let backgroundColor = undefined;
                switch (value) {
                  case 'inprogress':
                    backgroundColor = '#00eeee';
                    break;
                  case 'done':
                    backgroundColor = '#00ee00';
                    break;
                }

                return {
                  ...base,
                  backgroundColor
                }
              }
            }}
          />
        </span>
      </div>
      <span>Assignee: Hanggi Anggono</span>
    </div>
  )
}
