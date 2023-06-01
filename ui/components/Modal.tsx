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

Modal.useModal = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }
}
