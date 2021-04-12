import { Post } from './types'
import { PostList } from './components/post-list'
import { PostsSkeleton } from './components/posts-skeleton'
import { useFetch } from './use-fetch'

export const App: React.FC = () => {
  const postsQuery = useFetch<Post[]>('/posts')

  return (
    <section className="max-w-screen-lg mx-auto mt-8">
      {postsQuery.isLoading && <PostsSkeleton />}
      {postsQuery.isError && <p>Something went wrong :(</p>}

      {postsQuery.isSuccess && <PostList posts={postsQuery.data} />}
    </section>
  )
}
