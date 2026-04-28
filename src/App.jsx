import './App.css'

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white text-center px-4 py-8">
      <div className="max-w-xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-wider text-[#e94560] drop-shadow-lg">
          Utawala Ride Share
        </h1>
        <div className="w-20 h-1 bg-[#e94560] mx-auto mb-6 rounded-sm"></div>
        <h2 className="text-2xl md:text-4xl font-light mb-6 tracking-[0.3em] md:tracking-[0.5em] uppercase animate-pulse">
          Coming Soon
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-[#b8c5d6] max-w-lg mx-auto">
          We are working hard to bring you a seamless ride-sharing experience.
          Stay tuned for updates!
        </p>
      </div>
    </div>
  )
}

export default App

