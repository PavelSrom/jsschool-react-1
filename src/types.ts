export type Post = {
  id: number
  userId: number
  title: string
  body: string
}

export type Status = 'idle' | 'loading' | 'success' | 'error'
