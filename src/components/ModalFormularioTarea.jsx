import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useProyecto from '../../hook/useProyecto'
import Alerta from './Alerta'

export default function ModalFormularioTarea({ isOpen, closeModal }) {

  const { mostrarAlerta, alerta, submitTarea, tarea } = useProyecto()
  const [Id, setId] = useState()
  const [nombre, setnombre] = useState('')
  const [descripcion, setdescripcion] = useState('')
  const [prioridad, setprioridad] = useState('')
  const [fechaEntrega, setfechaEntrega] = useState('')
  const { id } = useParams()
  const handleSubmit = async e => {
    e.preventDefault()
    if ([nombre, descripcion, prioridad, fechaEntrega].includes('')) {
      mostrarAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }
    await submitTarea({ Id, proyecto: id, nombre, descripcion, fechaEntrega, prioridad })
    setId()
    setdescripcion('')
    setfechaEntrega('')
    setnombre('')
    setprioridad('')
    closeModal()
  }

  useEffect(() => {
    if (tarea._id) {
      setId(tarea._id)
      setnombre(tarea.nombre)
      setdescripcion(tarea.descripcion)
      setfechaEntrega(tarea.fechaEntrega?.split('T')[0])
      setprioridad(tarea.prioridad)
      return
    }
    setId()
    setnombre('')
    setdescripcion('')
    setfechaEntrega('')
    setprioridad('')
  }, [tarea])

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {
          closeModal()
          mostrarAlerta()
        }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {Id ? "Editar Tarea" : "Crear Tarea"}
                  </Dialog.Title>
                  {alerta && <Alerta message={alerta} />}
                  <form onSubmit={handleSubmit} action="" className='my-10'>
                    <div className='mb-5'>
                      <label htmlFor="nombre" className='text-gray-700 uppercase font-bold text-sm'>Nombre Tarea</label>
                      <input type="text" id='nombre' value={nombre} placeholder='Nombre de la Tarea' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        onChange={e => setnombre(e.target.value)}
                      />
                    </div>
                    <div className='mb-5'>
                      <label htmlFor="descripcion"
                        className='text-gray-700 uppercase font-bold text-sm'>Descripción Tarea</label>
                      <textarea id='descripcion'
                        value={descripcion}
                        placeholder='Descripcion de la Tarea' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        onChange={e => setdescripcion(e.target.value)}
                      />
                    </div>
                    <div className='mb-5'>
                      <label htmlFor="fecha-entrega"
                        className='text-gray-700 uppercase font-bold text-sm'>Fecha limite</label>
                      <input
                        type='date'
                        id='fecha-entrega'
                        value={fechaEntrega}
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        onChange={e => setfechaEntrega(e.target.value)}
                      />
                    </div>
                    <div className='mb-5'>
                      <label htmlFor="prioridad"
                        className='text-gray-700 uppercase font-bold text-sm'>Prioridad</label>
                      <select type="text"
                        id='prioridad'
                        value={prioridad}
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        onChange={e => setprioridad(e.target.value)}
                      >
                        <option value="">--  Seleccionar --</option>
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>

                      </select>
                    </div>


                    <input type="submit"
                      className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white cursor-pointer uppercase font-bold transition-colors rounded text-sm'
                      value={Id ? "Editar Tarea" : "Crear Tarea"}
                    />
                  </form>

                  <div className="mt-2 absolute top-1 right-1">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        closeModal()
                        mostrarAlerta()
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
