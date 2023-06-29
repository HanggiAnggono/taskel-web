'use client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import React, { PropsWithChildren } from 'react'

export default function ToastProvider({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  )
}
