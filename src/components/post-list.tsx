import Modal from "antd/lib/modal/Modal"
import axios from "axios"
import { useState, useEffect } from "react"
import type { Post, Status } from "../types"
import { Post as PostComponent } from "./post"

type Props = {
  posts: Post[] | undefined
}

export const PostList: React.FC<Props> = ({ posts }) => {
  const [postDetailId, setPostDetailId] = useState<number | undefined>()
  const [detail, setDetail] = useState<Post | undefined>()
  const [status, setStatus] = useState<Status>("idle")

  useEffect(() => {
    ;(() => {
      // fire request only if user clicked on detail icon
      if (!!postDetailId) {
        setStatus("loading")

        // artificial delay to simulate loading behavior
        const timeout = setTimeout(async () => {
          try {
            const response = await axios.get(`/posts/${postDetailId}`)

            setStatus("success")
            setDetail(response.data)
          } catch (err) {
            setStatus("error")
          }
        }, 1000)

        return () => {
          clearTimeout(timeout)
        }
      }
    })()
  }, [postDetailId])

  const handleReset = (): void => {
    setPostDetailId(undefined)
    setDetail(undefined)
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-8">
        {posts?.map((post) => (
          <PostComponent
            key={post.id}
            {...post}
            onDetailClick={() => setPostDetailId(post.id)}
          />
        ))}
      </div>

      <Modal
        title={`Post detail: ${postDetailId}`}
        visible={!!postDetailId}
        onCancel={handleReset}
        onOk={handleReset}
      >
        {status === "loading" ? (
          <p>Loading post detail...</p>
        ) : status === "error" ? (
          <p>Something went wrong :(</p>
        ) : (
          <div className="space-y-2">
            <p className="text-2xl text-center">{detail?.title}</p>
            <p className="text-base">{detail?.body}</p>
          </div>
        )}
      </Modal>
    </>
  )
}
