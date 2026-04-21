export default function PostCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
      {/* Imagem skeleton */}
      <div className="h-52 bg-gray-200" />

      <div className="p-5">
        {/* Categoria + data */}
        <div className="flex items-center gap-3 mb-3">
          <div className="h-5 w-20 bg-gray-200 rounded-full" />
          <div className="h-4 w-28 bg-gray-200 rounded" />
        </div>

        {/* Título */}
        <div className="h-5 bg-gray-200 rounded mb-2 w-full" />
        <div className="h-5 bg-gray-200 rounded mb-3 w-3/4" />

        {/* Descrição */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>

        {/* Rodapé */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex gap-4">
            <div className="h-4 w-10 bg-gray-200 rounded" />
            <div className="h-4 w-10 bg-gray-200 rounded" />
          </div>
          <div className="h-8 w-32 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  )
}