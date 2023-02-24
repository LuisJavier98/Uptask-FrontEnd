import React from 'react'
import useProyecto from '../../hook/useProyecto'

const Colaborador = ({ colaborador }) => {
  const { nombre, email } = colaborador
  const { handleModalEliminarColaborador } = useProyecto()
  return (
    <div className='borber-b gap-3 p-5 flex justify-between flex-wrap items-center'>
      <div className='mx-auto'>
        <p className='text-center'>{nombre}</p>
        <p className='text-sm text-center text-gray-700 '>{email}</p>
      </div>
      <div className='mx-auto'>
        <button
          type='button'
          className='  bg-red-600 px-4 py-3 text-white uppercase font-bold rounded-lg text-sm'
          onClick={() => handleModalEliminarColaborador(colaborador)}
        >Eliminar</button>
      </div>
    </div>
  )
}

export default Colaborador
