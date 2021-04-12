import { Button } from "antd"
import type { Post as PostType } from "../types"

const PlusRectangleFilled: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-2 -2 24 24"
    width="24"
    height="24"
    preserveAspectRatio="xMinYMin"
    className="icon__icon mx-auto"
  >
    <path d="M11 11h4a1 1 0 0 0 0-2h-4V5a1 1 0 0 0-2 0v4H5a1 1 0 1 0 0 2h4v4a1 1 0 0 0 2 0v-4zM4 0h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"></path>
  </svg>
)

type Props = PostType & {
  onDetailClick: () => void
}

export const Post: React.FC<Props> = ({ title, body, onDetailClick }) => {
  return (
    <div className="col-span-4">
      <div className="border border-blue-500 rounded-lg p-4 h-full flex flex-col">
        <p className="text-2xl truncate">{title}</p>
        <p className="text-base">{body}</p>

        <div className="flex justify-end mt-auto">
          <Button
            icon={<PlusRectangleFilled />}
            onClick={() => onDetailClick()}
          />
        </div>
      </div>
    </div>
  )
}
