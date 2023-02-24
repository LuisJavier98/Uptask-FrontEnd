import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hook/useAuth'
import Alerta from '../components/Alerta'

const Login = () => {

  const { setauth } = useAuth()
  const navigate = useNavigate()
  const [datosUsuario, setdatosUsuario] = useState({
    email: '',
    password: ''
  })
  const [alert, setalert] = useState()

  const handleSubmit = async e => {
    e.preventDefault()
    if (Object.values(datosUsuario).includes('')) {
      setalert({ msg: 'Todos los campos son obligatorios', error: true })
      return

    }
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND}/api/usuarios/login`, {
        email: datosUsuario.email,
        password: datosUsuario.password
      })
      localStorage.setItem('token', data.token)
      setauth(data)
      navigate('/proyectos')

    } catch (error) {
      setalert({ msg: error.response.data.msg, error: true })
    }
  }


  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>Inicia sesión y administra tus
        <span className='text-slate-700'> proyectos</span></h1>
      {alert && <Alerta message={alert} />}

      <form onSubmit={handleSubmit} className='my-10 bg-white shadow rounded-lg px-10 py-10'>
        <div className='my-5 '>
          <label
            className='uppercase text-gray-600 block text-xl font-bold' htmlFor="email">Email</label>
          <input
            id='email'
            type="email"
            placeholder='Email de Registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            onChange={e => setdatosUsuario({ ...datosUsuario, [e.target.id]: e.target.value })}
          />
        </div>
        <div className='my-5 '>
          <label
            className='uppercase text-gray-600 block text-xl font-bold' htmlFor="password">Password</label>
          <input
            id='password'
            type="password"
            placeholder='Email de Registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            onChange={e => setdatosUsuario({ ...datosUsuario, [e.target.id]: e.target.value })}
          />
        </div>

        <input type="submit" value='Iniciar sesión' className='bg-sky-700 text-white w-full py-3 mb-5 font-bold rounded-xl uppercase hover:cursor-pointer hover:bg-sky-800 transition-all ' />
      </form>
      <nav className='lg:flex lg:justify-between'>

        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm '
          to='/registrar'>¿No tienes una cuenta?Registrate
        </Link>
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm '
          to='/olvide-password'>Olvidé mi password
        </Link>


      </nav>
    </>
  )
}

export default Login
