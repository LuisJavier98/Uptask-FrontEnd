import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Alerta from '../components/Alerta'


const Registrar = () => {

  const [alert, setalert] = useState()
  const [usuario, setusuario] = useState({
    nombre: '',
    email: '',
    password: '',
    password2: ''
  })

  const handleActualizarUsuario = (data, value) => {
    setusuario({ ...usuario, [data]: value })
  }

  const handleSubmitDatosUsuario = async e => {
    e.preventDefault()
    if (Object.values(usuario).includes('')) {
      setalert({ msg: 'Todos los campos son obligatorios', error: true })
      return
    }
    if (usuario.password !== usuario.password2) {
      setalert({ msg: 'Las contraseñas no coinciden', error: true })
      return
    }

    if (usuario.password.length < 6) {
      setalert({ msg: 'La contraseña debe tener al menos 6 caracteres', error: true })
      return
    }


    try {
      const { nombre, email, password } = usuario
      const { data: { usuarioAlmacenado } } = await axios.post(`${import.meta.env.VITE_BACKEND}/api/usuarios`, { nombre, email, password })
      setusuario({
        nombre: '',
        email: '',
        password: '',
        password2: ''
      })
      e.target[0].value = ''
      e.target[1].value = ''
      e.target[2].value = ''
      e.target[3].value = ''
      setalert()
      setalert({ msg: 'Usuario creado correctamente , por favor verifique su correo', error: false })

    } catch (error) {
      setalert({ msg: error.response.data.msg, error: true })
    }
  }




  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>Crea tu cuenta y administra tus
        <span className='text-slate-700'> proyectos</span></h1>
      {alert && <Alerta message={alert} />}
      <form onSubmit={handleSubmitDatosUsuario} className='my-10 bg-white shadow rounded-lg px-10 py-10'>
        <div className='my-5 '>
          <label
            className='uppercase text-gray-600 block text-xl font-bold' htmlFor="nombre">Nombre</label>
          <input
            id='nombre'
            type="text"
            placeholder='Introduzca su Nombre'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            onChange={e => handleActualizarUsuario('nombre', e.target.value)}
          />
        </div>
        <div className='my-5 '>
          <label
            className='uppercase text-gray-600 block text-xl font-bold' htmlFor="email">Email</label>
          <input
            id='email'
            type="email"
            placeholder='Introduzca su Email'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            onChange={e => handleActualizarUsuario('email', e.target.value)}
          />
        </div>
        <div className='my-5 '>
          <label
            className='uppercase text-gray-600 block text-xl font-bold' htmlFor="password">Password</label>
          <input
            id='password'
            type="password"
            placeholder='Password'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            onChange={e => handleActualizarUsuario('password', e.target.value)}
          />
        </div>
        <div className='my-5 '>
          <label
            className='uppercase text-gray-600 block text-xl font-bold' htmlFor="password2">Repetir password</label>
          <input
            id='password2'
            type="password"
            placeholder='Repetir tu password'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            onChange={e => handleActualizarUsuario('password2', e.target.value)}
          />
        </div>

        <input type="submit" value='Crear cuenta' className='bg-sky-700 text-white w-full py-3 mb-5 font-bold rounded-xl uppercase hover:cursor-pointer hover:bg-sky-800 transition-all ' />
      </form>
      <nav className='lg:flex lg:justify-between'>

        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm '
          to='/'>¿Ya tienes una cuenta?Inicia Sesión
        </Link>
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm '
          to='/olvide-password'>Olvidé mi password
        </Link>


      </nav>
    </>
  )
}

export default Registrar
