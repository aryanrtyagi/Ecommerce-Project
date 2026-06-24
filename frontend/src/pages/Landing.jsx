import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* Brand */}
      <div className="text-center mb-10">
        <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-xl font-semibold">S</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Shoopit</h1>
        <p className="text-gray-500 mt-2">Who are you today?</p>
      </div>

      <p className="text-sm text-gray-400 mb-6 tracking-wide uppercase">Choose how you want to continue</p>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {/* Seller */}
        <button
          onClick={() => navigate("/seller")}
          className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:border-gray-400 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7H4a1 1 0 00-1 1v10a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
            </svg>
          </div>
          <h2 className="text-base font-semibold text-gray-900 mb-1">Seller</h2>
          <p className="text-xs text-gray-500">Add & manage your products</p>
          <span className="text-gray-400 text-lg mt-3 block">→</span>
        </button>

        {/* Buyer */}
        <button
          onClick={() => navigate("/shop")}
          className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:border-blue-400 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-base font-semibold text-gray-900 mb-1">Buyer</h2>
          <p className="text-xs text-gray-500">Browse & shop products</p>
          <span className="text-blue-400 text-lg mt-3 block">→</span>
        </button>
      </div>
    </div>
  );
}

export default Landing;