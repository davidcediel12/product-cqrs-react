import './App.css'

function App() {
  return (

    <div className='flex items-center justify-center w-full h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>

      <div className="flex flex-col w-1/4 h-1/2 bg-white/80 border-gray-700 items-center justify-between rounded-lg shadow-2xl">
        <h2 className="mt-4 text-3xl font-bold text-purple-400">Options</h2>
        <div className="flex-1 flex items-center justify-center">
          <button className="rounded bg-green-200 border-1 border-green-300 px-4 py-2 text-gray-600 font-bold hover:border-purple-400 hover:cursor-pointer
          shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-0">
            Create Product
          </button>
        </div>
      </div>

    </div>
  )
}

export default App
