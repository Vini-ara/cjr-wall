import { useEffect, useState } from "react"

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener('resize', handleResize)
  },[])

  return windowSize
}