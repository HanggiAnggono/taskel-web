export type SuccessResponse<T> = {
  success: true
  data: T
}

namespace AuthService {
  export type LoginResponse = {
    token: string
    user: {
      ID: number
      Username: string
      Name: string
      Email: string
      Password: string
      Watches: null
      CreatedAt: string
      UpdatedAt: string
    }
  }
}
