'use client'

import { Comment } from '@/types/comment'
import React from 'react'
import { IcUserCircle } from '../icons/IcUserCircle'
import { useForm } from 'react-hook-form'
import { useApi } from '@/api/api-service'
import { useRouter } from 'next/navigation'

type Props = {
  commentableType: string
  commentableId: number
  comments: Comment[]
}

type CommentForm = {
  comment: string
}

export function Comments(props: Props) {
  const { comments = [] } = props
  const { register, handleSubmit, reset } = useForm<CommentForm>()
  const router = useRouter()
  const [commentM, createComment] = useApi(
    { url: '/api/comments/create', method: 'POST', withCredentials: true },
    { manual: true }
  )

  const handleFormSubmit = (data: CommentForm) => {
    createComment({
      data: {
        comment: data.comment,
        commentable_type: props.commentableType,
        commentable_id: props.commentableId,
      },
    }).then(() => {
      reset()
      router.refresh()
    })
  }

  return (
    <div className="mt-10">
      <div className="mb-10">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col"
        >
          <div>
            <label htmlFor="comment">Add New Comment</label>
          </div>
          <div style={{ width: '60%' }}>
            <textarea
              id="comment"
              className="w-full p-2"
              rows={7}
              {...register('comment')}
            ></textarea>
            <button disabled={commentM.loading} className="btn-primary">
              Comment
            </button>
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
