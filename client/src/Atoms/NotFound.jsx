import Img from "./img";

const NotFound = () => {
    return (
        <>

            <div className="min-h-screen flex items-center justify-center bg-white shadow-lg rounded-lg text-center px-6 sm:px-8 py-8 sm:py-10 mx-auto">
                <div>
                    <h1 className="text-lg sm:text-xl font-title font-bold text-purple-600 mb-3 sm:mb-4">404 ERROR</h1>
                    <div className="relative h-[150px] w-[150px] sm:h-[200px] sm:w-[200px] mx-auto">
                        <img
                            src="/assets/error.png"
                            alt="Illustration"
                            className="h-full w-full object-contain"
                        />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-title font-bold text-purple-600 mt-4 sm:mt-6">No Results Found</h2>
                    <p className="text-neutral-500 mt-2 text-sm sm:text-base">We couldn’t find what you searched for. Try searching again.</p>
                    <div className="mt-6 sm:mt-8">
                    <a href="/">
                    <button className="px-6 py-2 sm:px-8 sm:py-3 bg-purple-600 text-white font-medium rounded-2xl hover:bg-purple-700 transition">
                       Home
                       
                    </button>
                    </a>
                </div>
                </div>
               
            </div>

        </>
    )
}
export default NotFound;