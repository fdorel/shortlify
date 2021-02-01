import {useState, useCallback} from 'react';

// we are creating our custom hook 'use Http'
export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // we use the function useCallback because we don't want React to enter in a recursion
  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true)
    try {
      // if we have body in request, then we stringify it, otherwise we get null
      if (body) {
        body = JSON.stringify(body)
        // in case we got the body, we send the header we the mention 'application/json' 
        headers['Content-Type'] = 'application/json'
      }
      // fetch ---> 1st parameter is url, 2nd param is a set of options
      const response = await fetch(url, { method, body, headers })
      const data = await response.json()

      //here we check if the response and its field 'ok' is not ok, then we have an error and we through it
      if (!response.ok) {
        // in case we have a message inside 'data' field, we write:
        throw new Error(data.message || 'Something went wrong with the response from the server')
      } 
      setLoading(false);

      return data
    } catch (e) {
      setLoading(false)
      // 'e.message' will come from the above 'throw new Error(data.message'
      setError(e.message)
      // we throw error throught the components to work with it
      throw e
    }
    // [] our method 'useCallback' still doesn't depend on anything, yet
  }, [])

  //here we export the function that will clear the errors
  const clearError = useCallback(() => setError(null), []);
 // loading is the flag
 return { loading, request, error, clearError }
}