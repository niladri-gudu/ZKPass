export default function LoadingCard() {
  return (
    <div className="border rounded-xl p-6 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
  );
}
