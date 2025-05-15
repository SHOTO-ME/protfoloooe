export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        <p className="mt-4 text-slate-600">Loading...</p>
      </div>
    </div>
  )
}
