import { Modal } from 'antd'
import { useState } from 'react'
import type { Post } from '../types'
import { useFetch } from '../use-fetch'
import { Post as PostComponent } from './post'

type Props = {
  posts: Post[] | undefined
}

export const PostList: React.FC<Props> = ({ posts }) => {
  const [postDetailId, setPostDetailId] = useState<number | undefined>()

  const postDetailQuery = useFetch<Post>(
    `/posts/${postDetailId}`,
    !!postDetailId,
    [postDetailId]
  )

  const handleReset = (): void => setPostDetailId(undefined)

  return (
    <>
      <div className="grid grid-cols-12 gap-8">
        {posts?.map(post => (
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
        {postDetailQuery.isLoading ? (
          <p>Loading post detail...</p>
        ) : postDetailQuery.isError ? (
          <p>Something went wrong :(</p>
        ) : postDetailQuery.isSuccess ? (
          <div className="space-y-2">
            <p className="text-2xl text-center">
              {postDetailQuery.data?.title}
            </p>
            <p className="text-base">{postDetailQuery.data?.body}</p>
          </div>
        ) : null}
      </Modal>
    </>
  )
}
