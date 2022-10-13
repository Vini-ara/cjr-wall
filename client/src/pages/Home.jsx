import { useMemo, useState } from "react"
import { useWindowSize } from "../hooks/useWIndowSize"
import api from "../services/api"

export default function Home() {
  const [users, setUsers] = useState([])
  const [nextPage, setNextPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { height, width } = useWindowSize()

  const listHeight = height ? height - 50 : 100

  const listRowHeight = 90 
  const USER_WIDTH = 250

  const usersPerRow = width ? Math.floor((width * 0.95) / USER_WIDTH) : 1 

  const loadNextPage = async () => {
    if(nextPage !== null && !isLoading) {
      setIsLoading(true) 
      try {
        const data = await api.data.getUsers()

        setUsers((prevUsers) => ([...prevUsers, ...data.users]))
        
        setNextPage(data.next_page)
      } catch (error) {
        console.error(error) 
        setNextPage(null)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const userRows = useMemo(() => {
    const rows = [] 
    for(let i = 0; i < users.length; i += usersPerRow) {
      rows.unshift(users.slice(i, i + usersPerRow))
    }

    return rows
  }, [usersPerRow, users])

  return (
    <>
      
    </>
  )
}