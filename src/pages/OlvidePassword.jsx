import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';

const OlvidePassword = () => {
  const [email, setemail] = useState('');
  const [alert, setalert] = useState()

  const handleSendEmail = async e => {
    e.preventDefault()
    if (email === '') {
      setalert({ msg: 'El campo es obligatorio', error: true })
      return
    }
    try {
      const respuesta = await axios.post(`${import.meta.env.VITE_BACKEND}/api/usuarios/olvide-password`, {
        email: email
      })

      setalert({ msg: respuesta.data.msg, error: false })
      setemail('')
    } catch (error) {
      setalert({ msg: error.response.data.msg, error: true })
    }
  }

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>Reestablece tu password y no pierdas acceso a tus {''}
        <span className='text-slate-700'> proyectos</span></h1>
      {alert && <Alerta message={alert} />}
      <form onSubmit={handleSendEmail} className='my-10 bg-white shadow rounded-lg px-10 py-10'>
        <div className='my-5 '>
          <label
            className='uppercase text-gray-600 block text-xl font-bold' htmlFor="email">Email</label>
          <input
            id='email'
            type="email"
            placeholder='Email de Registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={email}
            onChange={e => setemail(e.target.value)}
          />
        </div>
        <input type="submit" value='Enviar Instrucciones' className='bg-sky-700 text-white w-full py-3 mb-5 font-bold rounded-xl uppercase hover:cursor-pointer hover:bg-sky-800 transition-all ' />
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

export default OlvidePassword
