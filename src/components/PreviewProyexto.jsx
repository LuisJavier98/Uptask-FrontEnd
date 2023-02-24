import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hook/useAuth'

const PreviewProyexto = ({ proyecto }) => {

  const { auth } = useAuth()
  const { nombre, _id, cliente, creador } = proyecto

  return (
    <div className='borber-b p-5 flex gap-2 flex-col md:flex-row justify-between'>
      <div className='flex items-center gap-2 justify-between'>
        <p>
          {nombre}
          <span className='text-sm text-gray-500 uppercase'>
            {'  '}{cliente}
          </span>
        </p>
        {auth._id?.toString() !== creador.toString() &&
          <p className='p-1 text-xs rounded text-white bg-green-500 uppercase font-bold '>Colaborador</p>
        }
      </div>
      <Link
        to={`${_id}`}
        className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold'
      >Ver proyecto
      </Link>
    </div>
  )
}

export default PreviewProyexto
