function Submit() {
    return (
      <div className="max-w-lg my-12 mx-auto w-11/12 rounded-2xl flex flex-col items-center shadow-xl bg-gradient-to-br from-white to-gray-50 overflow-hidden border border-gray-100">
        <div className="w-full pt-10 pb-6 px-6 flex justify-center items-center">
          <div className="w-32 h-32 md:w-40 md:h-40 relative flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-green-500 shadow-lg transform transition-transform duration-300 hover:scale-105">
            <svg 
              className="w-20 h-20 md:w-24 md:h-24 text-white" 
              aria-hidden="true" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                fillRule="evenodd" 
                d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z" 
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        
        <div className="w-full py-8 px-6 bg-gradient-to-b from-green-50 to-green-100 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Thank you!
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            Your response has been submitted successfully
          </p>
          <button 
            className="mt-6 px-6 py-2 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
            onClick={() => window.location.href = '/'}
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }
  
  export default Submit;