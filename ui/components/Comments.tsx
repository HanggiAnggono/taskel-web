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
          <div style={{width: '60%'}}>
            <textarea id="comment" className="w-full"></textarea>
            <button className="btn-primary">Comment</button>
          </div>
        </form>
      </div>
      {comments.map((comment) => (
        <div key={comment.ID} className="flex mb-4">
          <div className="mr-3">
            <IcUserCircle className="w-8" />
          </div>
          <div>
            <span>
              {comment.Author?.Name}{' '}
              <span className="text-gray-400">
                {new Date(comment.CreatedAt)?.toLocaleString?.()}
              </span>{' '}
            </span>
            <p>{comment.Comment}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
