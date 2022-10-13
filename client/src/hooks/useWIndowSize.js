import { useEffect } from "react"

export function usaWindowSize() {
  const [windowSize, setWindowSize] = useState({
    height: undefined,
    width: undefined
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