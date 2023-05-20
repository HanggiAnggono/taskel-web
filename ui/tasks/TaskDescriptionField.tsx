'use client'

import React, { useState } from 'react'
import { useApi } from '@/api/api-service'

type TaskDescriptionFieldProps = {
  description: string
  taskKey: string
}

export default function TaskDescriptionField({
  description,
  taskKey,
}: TaskDescriptionFieldProps) {
  const [isEdit, setIsEdit] = useState(false)
  const [value, setValue] = useState(description)
  const [{ loading }, mutate] = useApi(
    { url: `/api/task/${taskKey}/edit`, method: 'PUT', withCredentials: true },
    { manual: true }
  )

  function reset() {
    setIsEdit(false)
    setValue(description)
  }

  function submit() {
    mutate({ data: { description: value } })
      .then(() => {
        setIsEdit(false)
      })
  }

  if (!isEdit) {
    return (
      <p
        style={{ minHeight: '100px' }}
        className={!value ? 'text-gray-400' : ''}
        onClick={() => setIsEdit(true)}
      >
        {value || 'Empty Description'}
      </p>
    )
  }

  return (
    <div>
      <textarea
        autoFocus
        value={value || ''}
        onChange={(e) => setValue(e.target.value)}
        className="w-full m-3"
        style={{ minHeight: '100px' }}
        disabled={loading}
      >
        {value}
      </textarea>
      <button onClick={submit} disabled={loading} className="btn-primary mr-3">
        Save
      </button>
      <button onClick={reset} disabled={loading} className="btn-secondary">
        Cancel
      </button>
    </div>
  )
}
