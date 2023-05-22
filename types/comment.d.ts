import { User } from './task'

export type Comment = {
  ID: number
  AuthorID: number
  CommentableID: number
  CommentableType: string
  Author: User
  Comment: string
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string
  Upvotes: number
  Downvotes: number
}
