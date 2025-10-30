export default function Payment() {
  return (
    <div className="min-h-screen bg-white px-2 py-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Payments</h1>
      <div className="w-full max-w-md bg-purple-50 rounded-xl shadow p-6 mb-4">
        <p className="text-base text-gray-700 mb-2">Payment UI (Daraja) will be implemented here.</p>
        <p className="text-sm text-green-700">For the hackathon you can call <span className="font-mono bg-green-100 px-2 py-1 rounded">/payment/initiate</span> and poll <span className="font-mono bg-green-100 px-2 py-1 rounded">/payment/status</span>.</p>
      </div>
      <div className="w-full text-center text-sm text-gray-500 mt-4">
        Powered by SmartGas Pro
      </div>
    </div>
  );
}
