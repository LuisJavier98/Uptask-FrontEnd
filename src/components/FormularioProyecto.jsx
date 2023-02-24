import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useProyecto from '../../hook/useProyecto'
import Alerta from './Alerta'

const FormularioProyecto = () => {
  const [nombre, setnombre] = useState('')
  const [descripcion, setdescripcion] = useState('')
  const [fechaEntrega, setfechaEntrega] = useState('')
  const [cliente, setcliente] = useState('')
  const { mostrarAlerta, alerta, submitProyecto, submitProyectoEditado } = useProyecto()
  const params = useParams()
  const navigate = useNavigate()


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
    if (params.id) {
      console.log(params.id)
      axios.get(`${import.meta.env.VITE_BACKEND}/api/proyectos/${params.id}`, config)
        .then(res => {
          const date = new Date(res.data.proyecto.fechaEntrega)
          setnombre(res.data.proyecto.nombre)
          setdescripcion(res.data.proyecto.descripcion)
          setfechaEntrega(date.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit', year: 'numeric' }).split(' ').join('-').split('').filter(a => a !== '.').join(''))
          setcliente(res.data.proyecto.cliente)

        })
        .catch(err => console.log(err))
    }

  }, [])



  const handleSubmit = async e => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) { return }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
      mostrarAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      setTimeout(() => {
        mostrarAlerta()
      }, 1500);
      return
    }

    if (params.id) {
      axios.patch(`${import.meta.env.VITE_BACKEND}/api/proyectos/${params.id}`, {
        cliente, descripcion, fechaEntrega, nombre
      }, config)
        .then(res => {
          submitProyectoEditado(params.id, { cliente, descripcion, fechaEntrega, nombre })
          mostrarAlerta({ msg: res.data.msg, error: false });
          setTimeout(() => {
            mostrarAlerta()
            navigate('/proyectos')
          }, 1500);
        })
        .catch(err => console.log(err))
      setcliente('')
      setdescripcion('')
      setfechaEntrega('')
      setnombre('')
    } else {
      await submitProyecto({ nombre, descripcion, fechaEntrega, cliente })
      setcliente('')
      setdescripcion('')
      setfechaEntrega('')
      setnombre('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white py-10 px-5 w-full rounded-lg shadow'
      action="">
      {alerta && <Alerta message={alerta} />}
      <div className='mb-5'>
        <label htmlFor="nombre" className='text-gray-700 uppercase font-bold text-sm'>Nombre</label>
        <input
          id='nombre'
          type="text"
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Nombre del proyecto'
          value={nombre}
          onChange={e => setnombre(e.target.value)}
        />
      </div>
      <div className='mb-5'>
        <label htmlFor="descipcion" className='text-gray-700 uppercase font-bold text-sm'>Descripcion</label>
        <textarea
          id='descripcion'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Descripcion del Proyecto'
          value={descripcion}
          onChange={e => setdescripcion(e.target.value)}
        />
      </div>
      <div className='mb-5'>
        <label htmlFor="fecha-entrega" className='text-gray-700 uppercase font-bold text-sm'>Fecha Entrega</label>
        <input
          id='fecha-entrega'
          type="date"
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={fechaEntrega}
          onChange={e => setfechaEntrega(e.target.value)}
        />
      </div>
      <div className='mb-5'>
        <label htmlFor="cliente" className='text-gray-700 uppercase font-bold text-sm'>Nombre Cliente</label>
        <input
          id='cliente'
          type="text"
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Nombre del Cliente'
          value={cliente}
          onChange={e => setcliente(e.target.value)}
        />
      </div>
      {
        params.id ?
          (<input
            type="submit"
            value='Editar Proyecto'
            className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors '
          />)
          :
          (<input
            type="submit"
            value='Crear Proyecto'
            className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors '
          />)
      }


    </form>
  )
}

export default FormularioProyecto
