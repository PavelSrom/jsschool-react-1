import { useState, useEffect } from "react"
import axios from "axios"
import { Post, Status } from "./types"
import { PostList } from "./components/post-list"
import { PostsSkeleton } from "./components/posts-skeleton"

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | undefined>()
  const [status, setStatus] = useState<Status>("idle")

  useEffect(() => {
    ;(() => {
      setStatus("loading")

      // artificial delay to simulate loading behavior
      const timeout = setTimeout(async () => {
        try {
          const response = await axios.get("/posts")

          setStatus("success")
          setPosts(response.data)
        } catch (err) {
          setStatus("error")
        }
      }, 1000)

      return () => {
        clearTimeout(timeout)
      }
    })()
  }, [])

  return (
    <section className="max-w-screen-lg mx-auto mt-8">
      {status === "loading" && <PostsSkeleton />}
      {status === "error" && <p>Something went wrong :(</p>}

      {status === "success" && <PostList posts={posts} />}
    </section>
  )
}
