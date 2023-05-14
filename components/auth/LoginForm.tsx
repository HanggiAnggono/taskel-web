'use client'

import { useApiNoAuth } from '@/api/api-service'
import { FormEvent } from 'react'

export function LoginForm() {
  const [{ loading, error, data }, mutate] = useApiNoAuth(
    { url: '/api/login', method: 'post' },
    { manual: true }
  )

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const username = formData.get('username')
    const password = formData.get('password')

    mutate({ data: { username, password } }).then((resp) => {
      console.log(resp)
    })
  }
  return (
    <div className="bg-white p-5">
      <h1>Login</h1>
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="username"
            className="w-full"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            className="w-full"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <input type="submit" className="btn-primary" disabled={loading} />
        </div>
      </form>
    </div>
  )
}
