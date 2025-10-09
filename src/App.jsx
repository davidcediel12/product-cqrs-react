import './App.css'

function App() {
  return (

    <div className='flex items-center justify-center w-full h-screen'>

      <div className="flex flex-col w-1/4 h-1/2 bg-gray-200/50 border-gray-700 items-center justify-between rounded-lg">
        <h2 className="mt-4 text-3xl font-bold">Options</h2>
        <div className="flex-1 flex items-center justify-center">
          <button className="rounded bg-green-200 border-1 border-green-300 px-4 py-2 text-gray-600 font-bold hover:border-purple-400 hover:cursor-pointer">
            Create Product
          </button>
        </div>
      </div>

    </div>
  )
}

export default App
