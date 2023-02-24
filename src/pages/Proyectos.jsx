import React, { useEffect } from 'react'
import useProyecto from '../../hook/useProyecto'
import Alerta from '../components/Alerta'
import PreviewProyexto from '../components/PreviewProyexto'


const Proyectos = () => {

  const { proyectos, alerta } = useProyecto()
  return (
    <>
      <h1 className='text-4xl font-black'>Proyectos </h1>
      {alerta && <Alerta message={alerta} />}
      <div className='bg-white shadow mt-10 rounded-lg'>
        {proyectos.length ?
          proyectos.map(proyecto => (
            <PreviewProyexto key={proyecto._id} proyecto={proyecto} />
          ))

          : <p className=' text-center text-gray-600 uppercase p-5'>No hay proyectos aún</p>}
      </div>
    </>
  )
}

export default Proyectos
