'use client'

import { Comment } from '@/types/comment'
import React from 'react'
import { IcUserCircle } from '../icons/IcUserCircle'

type Props = {
  comments: Comment[]
}

export function Comments(props: Props) {
  const { comments } = props
  return (
    <div className="mt-10">
      <div className="mb-10">
        <form className="flex flex-col">
          <div>
            <label htmlFor="comment">Add New Comment</label>
          </div>
          <div style={{ width: '60%' }}>
            <textarea id="comment" className="w-full"></textarea>
            <button className="btn-primary">Comment</button>
          </div>
        </form>
      </div>
      {comments.map((comment) => (
        <div key={comment.ID} className="mb-6">
          <div className="flex items-center">
            <IcUserCircle className="w-8" height="2rem" />
            <span className="ml-2">
              {comment.Author?.Name}{' '}
              <span className="text-gray-400 ml-3">
                {new Date(comment.CreatedAt)?.toLocaleString?.()}
              </span>{' '}
            </span>
          </div>
          <p>{comment.Comment}</p>
        </div>
      ))}
    </div>
  )
}
