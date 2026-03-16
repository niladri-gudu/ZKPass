/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ClaimStatusBadge({ claimed }: any) {
  if (claimed) {
    return (
      <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
        Claimed
      </span>
    );
  }

  return (
    <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-full">
      Eligible
    </span>
  );
}
