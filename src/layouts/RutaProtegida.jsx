import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hook/useAuth'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const RutaProtegida = () => {
  const { auth, cargando } = useAuth()

  if (cargando) {
    return (
      <div>'Cargando....'</div>
    )
  }
  else {
    return (
      <>
        {auth._id ? (
          <div className='bg-gray-100'>
            <Header />
            <div className='md:flex md:min-h-screen'>
              <Sidebar />
              <main className='p-3 text-center sm:text-left flex-1 sm:p-10 '>
                <Outlet />
              </main>
            </div>
          </div>
        ) : <Navigate to={'/'} />}
      </>
    )
  }
}

export default RutaProtegida
