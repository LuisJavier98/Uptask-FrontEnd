import React, { useState } from 'react'
import useProyecto from '../../hook/useProyecto'
import Alerta from './Alerta'

const FormularioColaborador = () => {
  const [email, setemail] = useState('')
  const { mostrarAlerta, alerta, submitColaborador } = useProyecto()
  console.log(alerta)
  const handleSubmit = e => {
    e.preventDefault()
    if (email === '') {
      mostrarAlerta({
        msg: 'El email es obligatorio',
        error: true
      })
      setTimeout(() => {
        mostrarAlerta()
      }, 1500);
      return
    }
    submitColaborador(email)
  }



  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white py-10 px-5 w-full rounded-lg shadow'
    >
      {alerta && <Alerta message={alerta} />}
      <div className='mb-5'>
        <label htmlFor="email" className='text-gray-700 uppercase font-bold text-sm'>Email Colaborador</label>
        <input
          type="email"
          id='email'
          value={email}
          placeholder='Email del usuario'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          onChange={e => setemail(e.target.value)}
        />
      </div>
      <input type="submit"
        className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white cursor-pointer uppercase font-bold transition-colors rounded text-sm'
        value='Buscar Colaborador'
      />
    </form>
  )
}

export default FormularioColaborador
