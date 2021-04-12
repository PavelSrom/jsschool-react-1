import { Button } from "antd"
import type { Post as PostType } from "../types"

type Props = PostType & {
  onDetailClick: () => void
}

export const Post: React.FC<Props> = ({ title, body, onDetailClick }) => {
  return (
    <div className="col-span-4">
      <div className="border border-blue-500 rounded-lg p-4 h-full">
        <p className="text-2xl truncate">{title}</p>
        <p className="text-base">{body}</p>

        <div className="flex justify-end">
          <Button
            icon={<p className="text-2xl text-red-500">+</p>}
            onClick={() => onDetailClick()}
          />
        </div>
      </div>
    </div>
  )
}
