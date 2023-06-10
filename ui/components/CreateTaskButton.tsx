'use client'

import React from 'react'
import { Modal } from './Modal'
import { CreateTaskForm } from '../tasks/CreateTaskForm'

export const CreateTaskButton = () => {
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => Modal.open('createTaskModal')}
      >
        Create
      </button>
      <Modal id="createTaskModal">
        <CreateTaskForm />
      </Modal>
    </>
  )
}
