function Submit(){
    return(
        <div className="border-2 border-white w-10/12 my-10 mx-auto h-96 rounded-xl flex box-border px-3 pt-2 flex-col shadow-xl bg-white">
            <div className="image   w-full rounded-md h-3/5 flex justify-center items-center "><svg className="w-2/4 md:w-1/4 h-3/4 border-2 rounded-full shadow-md bg-green-400 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fillRule="evenodd" d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z" clipRule="evenodd"/>
</svg>
</div>
            <div className="h-2/5 flex items-center w-full text-wrap text-center font-semibold flex-col gap-2"> <h1 className="text-2xl">Thankyou</h1> your response is submitted successfully</div>
        </div>
    )
}
export default Submit