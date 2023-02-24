import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProyecto from '../../hook/useProyecto'
import FormularioColaborador from '../components/FormularioColaborador'

const NuevoColaborador = () => {
  const { obtenerProyecto, proyecto, colaborador, agregarColaborador
  } = useProyecto()
  const params = useParams()

  useEffect(() => {
    obtenerProyecto(params.id)
  }, [])

  return (
    <>
      <h1 className='text-4xl font-black'>Añadir Colaborador(a) al Proyecto: {proyecto.nombre}</h1>
      <div className='mt-10 flex w-full justify-center'>
        <FormularioColaborador />
      </div>
      {colaborador?._id && (
        <div className='mt-10'>
          <div className='bg-white py-10 px-5 full rounded-lg shadow'>
            <h2 className='text-center mb-10 text-2xl font-bold'>Resultado:</h2>
            <div className='flex justify-between flex-wrap items-center'>
              <p className='font-black flex-1 md:flex-none text-center justify-center'>{colaborador.nombre}</p>
              <button
                onClick={() => agregarColaborador({
                  email: colaborador.email
                })}
                type='button'
                className='bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm md:flex-none flex-1 '
              >
                Agregar al Proyecto
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NuevoColaborador
