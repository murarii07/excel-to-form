const useDebounce=(func,timer)=>{
    let timeoutId
    
    return (...args)=>{
        clearTimeout(timeoutId)
        timeoutId=setTimeout(()=>func(...args),timer)
    }
}
export default useDebounce

//debouncing 
    /*
     basically create a closure
     1.function of debounce(function,timer)
     2.save timoutId in a var of a outer func
     3.return a func in which  first clear the previous func using his id and set var =setTImout(function,timer)

*/