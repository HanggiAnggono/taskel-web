'use client'

import React from 'react'
import { Modal } from './Modal'
import { useApi } from '@/api/api-service'
import { useRouter } from 'next/navigation'

export const LogoutButton = () => {
  const r = useRouter()
  const [meta, logout] = useApi(
    {
      url: '/api/logout',
      method: 'POST',
      withCredentials: true,
    },
    {
      manual: true,
    }
  )

  const close = () => {
    document.querySelector('#logoutModal')?.close()
  }

  const handleLogout = () => {
    logout().then(() => {
      close()
      r.replace('/auth/login')
    })
  }

  return (
    <>
      <a
        href="#"
        onClick={(e) => {
          document.querySelector('#logoutModal')?.showModal()
        }}
      >
        Logout
      </a>
      <Modal id="logoutModal">
        <div>
          <div className="font-semibold">Logout</div>
          <p className="mb-2">
            Are you sure you want to logout?
            <br /> you will be redirected to login page
          </p>
          <button
            type="button"
            onClick={handleLogout}
            className="btn-primary mr-1"
            disabled={meta.loading}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={close}
            className="btn-secondary"
            disabled={meta.loading}
          >
            No
          </button>
        </div>
      </Modal>
    </>
  )
}
