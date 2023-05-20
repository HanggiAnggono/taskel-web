
export type Task = {
  ID: number
  Key: string
  Title: string
  Description: null
  Status: string
  UserID: number | null
  User: null
  Watchers: [] | null
  CreatedAt: Date
  UpdatedAt: Date
}
