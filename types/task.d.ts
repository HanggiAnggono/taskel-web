
export type Task = {
  ID: number
  Key: string
  Title: string
  Description: string
  Status: 'todo' | 'inprogress' | 'done'
  UserID: number | null
  User: User
  Watchers: User[] | null
  CreatedAt: Date
  UpdatedAt: Date
}
export type User = {
  ID: number
  Username: string
  Name: string
  Email: string
  Password: string
  Watches: Task[]
  CreatedAt: Date
  UpdatedAt: Date
}