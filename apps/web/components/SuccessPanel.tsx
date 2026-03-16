/* eslint-disable @typescript-eslint/no-explicit-any */
export default function SuccessPanel({ txHash }: any) {
  return (
    <div className="mt-6 p-6 border rounded-xl bg-green-50">

      <h3 className="text-lg font-semibold text-green-700">
        🎉 Claim Successful
      </h3>

      <p className="text-sm text-gray-600 mt-2">
        Your access pass has been claimed.
      </p>

      <p className="text-xs mt-2 text-gray-500">
        Tx: {txHash}
      </p>
    </div>
  );
}