export type UserType = {
  name: string
  username: string
  email: string
  _id: number
  image: string
  [key: string]: any
  length: number
}

export type PostType = {
  map(
    arg0: (post: { images: string; _id: string; subtitle: string,   likes: string
    }) => void
  ): import('react').ReactNode
  length: number
  subtitle: string[]
  comments: string[]
  _id: string
  images: string[]
}
