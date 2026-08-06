import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      {/* Brand */}
      <div className="text-center mb-10">
        <div className="w-14 h-14 bg-black flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-xl font-semibold font-display">S</span>
        </div>
        <h1 className="font-display text-3xl font-semibold text-black">GLITCH & CO.</h1>
        <p className="text-neutral-500 mt-2">Who are you today?</p>
      </div>

      <p className="text-xs text-neutral-400 mb-6 tracking-[0.2em] uppercase">Choose how you want to continue</p>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {/* Seller */}
        <button
          onClick={() => navigate("/seller")}
          className="bg-white border border-neutral-200 p-6 text-center hover:border-black transition-all group"
        >
          <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-black transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-neutral-700 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7H4a1 1 0 00-1 1v10a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
            </svg>
          </div>
          <h2 className="text-base font-semibold text-black mb-1">Seller</h2>
          <p className="text-xs text-neutral-500">Add & manage your products</p>
          <span className="text-neutral-400 text-lg mt-3 block">→</span>
        </button>

        {/* Buyer */}
        <button
          onClick={() => navigate("/shop")}
          className="bg-white border border-neutral-200 p-6 text-center hover:border-black transition-all group"
        >
          <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-black transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-neutral-700 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-base font-semibold text-black mb-1">Buyer</h2>
          <p className="text-xs text-neutral-500">Browse & shop products</p>
          <span className="text-neutral-400 text-lg mt-3 block">→</span>
        </button>
      </div>
    </div>
  );
}

export default Landing;