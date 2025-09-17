// filepath: c:\Users\Wakin\Main\Projects\Movie-Explorer\components\MovieItemLoading.tsx
export default function MovieItemLoading() {
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="border border-gray-300 rounded-lg p-4 w-64 h-96 flex flex-col animate-pulse"></div>
      <div className="bg-gray-300 h-3/4 mb-4"></div>
      <div className="bg-gray-300 h-6 mb-2 w-3/4"></div>
      <div className="bg-gray-300 h-4 w-1/2"></div>
    </div>
  )
}