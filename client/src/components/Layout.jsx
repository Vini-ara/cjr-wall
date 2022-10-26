import { Link, Outlet } from "react-router-dom"
import logo from "../assets/logo.svg"
import { useAuth } from "../contexts/AuthContext"
import LoginButton from "./LoginButton"
import { UserInfo } from "./UserInfo"

export default function Layout() {
  const { user } = useAuth()

  return (
    <>
      <header className="h-12 p-[.5%] bg-[#DEDEDE] flex items-center justify-between w-[100%]">
        <Link to="/">
          <img src={logo} className="h-9 w-auto"/>
        </Link>
        {user === null ? (
          <></>
        ) : user ? (
          <UserInfo/>
        ) : (
          <LoginButton />
        )}
      </header>
      <main>
        <Outlet/>
      </main>
    </> 
  )
}
