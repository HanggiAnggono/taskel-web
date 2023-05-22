import { axiosServer } from '@/api/api-service'
import { LoginForm } from '@/components/auth/LoginForm'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Login() {
  async function getProfile() {
    const res = await axiosServer.get('/api/profile', {
      headers: {
        cookie: cookies().toString(),
      },
    })
    return res?.data
  }

  const data = await getProfile().catch(() => null)

  if (data?.data?.userId) {
    redirect('/')
  }

  return (
    <div className="pt-60">
      <div className="max-w-lg mx-auto">
        <LoginForm />
      </div>
    </div>
  )
}
