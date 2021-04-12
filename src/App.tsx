import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "antd"
import { Post } from "./types"
import { PostList } from "./components/post-list"

type Status = "idle" | "loading" | "success" | "error"

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | undefined>()
  const [status, setStatus] = useState<Status>("idle")

  useEffect(() => {
    ;(async () => {
      setStatus("loading")

      try {
        const response = await axios.get("/posts")

        setStatus("success")
        setPosts(response.data)
      } catch (err) {
        setStatus("error")
      }
    })()
  }, [])

  return (
    <>
      <h1 className="text-red-500">Hello world</h1>
      <Button type="primary" className="mt-8">
        Click me
      </Button>

      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Something went wrong :(</p>}

      {status === "success" && (
        <>
          <p>Success!</p>
          <PostList posts={posts} />
        </>
      )}
    </>
  )
}
