import Img from "./img";

const NotFound = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full px-6 py-8 md:px-8 md:py-10 transition-all duration-300 hover:shadow-2xl">
          <div className="space-y-6">
            <div aria-labelledby="error-title">
              <label id="error-title" className="sr-only">Error Status</label>
              <h1 className="text-xl md:text-2xl font-bold text-purple-600 mb-2 tracking-tight">404 ERROR</h1>
            </div>
            
            <div className="relative h-40 w-40 md:h-52 md:w-52 mx-auto transform transition-transform duration-500 hover:scale-105">
              <img
                src="/assets/error.png"
                alt="404 Error Illustration"
                className="h-full w-full object-contain drop-shadow-md"
              />
            </div>
            
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4">No Results Found</h2>
              <p className="text-gray-500 mt-3 text-base">We couldn't find what you searched for. Try searching again.</p>
            </div>
            
            <div className="mt-8">
              <a href="/">
                <button className="w-full px-6 py-3 bg-purple-600 text-white font-medium rounded-xl shadow-md hover:bg-purple-700 hover:scale-102 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300">
                  Back to Home
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;