'use client'

import React from 'react'
import { Modal } from './Modal'
import { CreateTaskForm } from '../tasks/CreateTaskForm'
import { notification } from '../notifications/notifications'

export const CreateTaskButton = () => {
  const handleSuccessCreateTask = () => {
    notification.success('Task created')
    Modal.close('createTaskModal')
  }

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => {
          Modal.open('createTaskModal')
        }}
      >
        Create
      </button>
      <Modal id="createTaskModal">
        <CreateTaskForm onSuccess={handleSuccessCreateTask} />
      </Modal>
    </>
  )
}
