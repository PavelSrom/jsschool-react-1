export const PostsSkeleton: React.FC = () => (
  <div className="grid grid-cols-12 gap-8">
    {[...new Array(6).keys()].map((item) => (
      <div key={item} className="col-span-4">
        <div className="animate-pulse p-4 space-y-6 border border-blue-400 rounded-lg">
          <div className="w-full h-6 bg-blue-400 rounded-md" />
          <div className="space-y-2">
            <div className="w-full h-4 bg-blue-400 rounded-md" />
            <div className="w-full h-4 bg-blue-400 rounded-md" />
            <div className="w-full h-4 bg-blue-400 rounded-md" />
          </div>
          <div className="w-1/2 h-3 bg-blue-400 rounded-md" />
        </div>
      </div>
    ))}
  </div>
)
