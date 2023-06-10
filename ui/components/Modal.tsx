'use client'

import React from 'react'
import { IcClose } from '../icons/IcClose'

export function Modal({
  children,
  ...props
}: React.DetailedHTMLProps<
  React.DialogHTMLAttributes<HTMLDialogElement>,
  HTMLDialogElement
>) {
  return (
    <dialog className="shadow-md pt-3" {...props}>
      <button className="float-right mb-3" onClick={() => Modal.close(`${props.id}`)}>
        <IcClose height="1rem" />
      </button>
      {children}
    </dialog>
  )
}

Modal.open = (id: string) => {
  document.querySelector(`#${id}`)?.showModal()
}

Modal.close = (id: string) => {
  document.querySelector(`#${id}`)?.close()
}
