import { useEffect } from "react";

export function useGoogleAuth(ref, callback = () => {}) {
  useEffect(()=>{
    if(ref.current ) {
      function handleCallbackResponse(response) {
        callback(response);
      }

      console.log(import.meta.env.VITE_CLIENT_ID)
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_CLIENT_ID,
        callback: handleCallbackResponse
      })

      google.accounts.id.renderButton(ref.current, {
        type: 'standard',
        theme: 'outline',
        shape: 'circle'
      })
    }
  }, [ref.current, callback]);
}
