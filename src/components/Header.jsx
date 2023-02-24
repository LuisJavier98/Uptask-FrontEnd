import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hook/useAuth'
import useProyecto from '../../hook/useProyecto'
import Busqueda from './Busqueda'

const Header = () => {
  const navigate = useNavigate()
  const { handleBuscador, cerrarSesionProyecto } = useProyecto()
  const { cerrarSesionAuth } = useAuth()

  const handleCerrarSesion = () => {
    cerrarSesionAuth()
    cerrarSesionProyecto()
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <header className='px-4 py-5 bg-white borber-b'>
      <div className='md:flex md:justify-between'>
        <h2 onClick={() => navigate('/proyectos')} className='text-4xl text-sky-600 font-black mb-5 md:mb-0 text-center cursor-pointer'>Uptask</h2>
        <div className='flex flex-col md:flex-row items-center gap-4'>
          <button
            type='button'
            className='font-bold uppercase'
            onClick={handleBuscador}
          >
            Buscar Proyecto
          </button>
          <Link
            to={'/proyectos'}
            className='font-bold uppercase'
          >Proyectos
          </Link>
          <button
            type='button'
            className='text-white text-sm  bg-sky-600 p-3 rounded-md uppercase font-bold'
            onClick={handleCerrarSesion}
          >
            Cerrar Sesión
          </button>
          <Busqueda />
        </div>

      </div>

    </header>
  )
}

export default Header
