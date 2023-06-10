'use client'

import React from 'react'

export function Modal(
  props: React.DetailedHTMLProps<
    React.DialogHTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement
  >
) {
  return <dialog className="shadow-md" {...props} />
}

Modal.open = (id: string) => {
  document.querySelector(`#${id}`)?.showModal()
}

Modal.close = (id: string) => {
  document.querySelector(`#${id}`)?.close()
}