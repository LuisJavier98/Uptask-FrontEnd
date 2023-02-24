import { useContext } from 'react'
import { proyectoContext } from '../context/ProyectoProvider'

const useProyecto = () => {
  return useContext(proyectoContext)
}

export default useProyecto
