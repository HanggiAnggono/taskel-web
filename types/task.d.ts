
export type Task = {
  ID: number
  Key: string
  Title: string
  Description: null
  Status: 'todo' | 'inprogress' | 'done'
  UserID: number | null
  User: null
  Watchers: [] | null
  CreatedAt: Date
  UpdatedAt: Date
}
