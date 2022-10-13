import { Link, Outlet } from "react-router-dom"
import logo from "../assets/logo.svg"

export default function Layout() {
  return (
    <>
      <header className="h-12 p-[.5%] bg-[#DEDEDE] flex items-center justify-between w-[100%]">
        <Link>
          <img src={logo} className="h-9 w-auto"/>
        </Link>
      </header>
      <main>
        <Outlet/>
      </main>
    </> 
  )
}