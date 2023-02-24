import React from 'react'
import useAuth from './useAuth'
import useProyecto from './useProyecto'



const useAdmin = () => {
  const { proyecto } = useProyecto()
  const { auth } = useAuth()
  return proyecto.creador === auth._id
}

export default useAdmin
