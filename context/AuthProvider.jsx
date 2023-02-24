import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext()


const AuthProvider = ({ children }) => {


  const [auth, setauth] = useState({})
  const [cargando, setcargando] = useState(true)
  const navigate = useNavigate()

  const cerrarSesionAuth = () => {
    setauth({})
  }
  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setcargando(false)
        return
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND}/api/usuarios/perfil`, config)
        setauth(data)
        // navigate('/proyectos')

      } catch (error) {
        setauth({})
      }
      setcargando(false)

    }

    autenticarUsuario()
  }, [])

  return (
    <AuthContext.Provider value={{
      setauth,
      auth,
      cargando,
      cerrarSesionAuth
    }}>
      {children}
    </AuthContext.Provider>

  )
}

export default AuthProvider
