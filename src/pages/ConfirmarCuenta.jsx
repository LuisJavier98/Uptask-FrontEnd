import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const ConfirmarCuenta = () => {
  const [alerta, setalerta] = useState(false)
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  const token = useParams()

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND}/api/usuarios/confirmar/${token.id}`)
      .then(res => {
        setalerta(true)
        setCuentaConfirmada(true)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>Confirma tu cuenta y comienza a crear tus{''}
        <span className='text-slate-700'> proyectos</span></h1>
      <div className='mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-lg bg-white'>
        {alerta ? <p className='my-5 p-4 from-blue-400 to-blue-600 bg-gradient-to-br text-white font-bold text-center text-xl rounded-lg '>Usuario confirmado correctamente</p> : <p className='my-5 p-4 from-red-400 to-red-600 bg-gradient-to-br text-white font-bold text-center text-xl rounded-lg '>Token no valido</p>}
        {cuentaConfirmada && <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm '
          to='/'>Inicia Sesión
        </Link>}
      </div>
    </>
  )
}

export default ConfirmarCuenta
