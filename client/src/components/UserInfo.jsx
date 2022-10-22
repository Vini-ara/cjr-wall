import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function UserInfo() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const name = user.name.split(" ")[0]

  const signOutHandler = () => {
    signOut(() => {
      navigate('/', { replace: true})
    })
  }

  return (
    <div>
      <Link to="profile" className="flex items-center space-x-4">
        <img src={user.picture} alt={`Foto de ${user.name}`} className="w-8 h-8 rounded-full"/>
        <p className="font-normal text-slate-900 hidden sm:black">{name}</p>
      </Link> 
      <button 
        type="button"
        onClick={signOutHandler}
        className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
      >
        Sair
      </button>
    </div>
  )
}