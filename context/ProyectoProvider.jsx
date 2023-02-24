import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const proyectoContext = createContext()
import io from 'socket.io-client'
import useAuth from '../hook/useAuth'
let socket

const ProyectoProvider = ({ children }) => {
  const [proyectos, setproyectos] = useState([])
  const [alerta, setalerta] = useState()
  const [proyecto, setproyecto] = useState([])
  const [tarea, settarea] = useState({})
  const [colaborador, setcolaborador] = useState({})
  const [buscador, setbuscador] = useState(false)
  const [modalEliminarTarea, setmodalEliminarTarea] = useState(false)
  const [modalEliminarColaborador, setmodalEliminarColaborador] = useState(false)

  const { auth } = useAuth()

  let [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const mostrarAlerta = alerta => {
    setalerta(alerta)
  }

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND)
  }, [])

  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND}/api/proyectos`, config)
        setproyectos(data)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerProyectos()
  }, [auth])


  const submitProyectoEditado = (id, proyectoEditado) => {
    setproyectos(proyectos.map(proyecto => {
      if (proyecto._id == id) {
        console.log(proyecto._id)
        return { ...proyecto, 'nombre': proyectoEditado.nombre, 'fechaEntrega': proyectoEditado.fechaEntrega, 'cliente': proyectoEditado.cliente, 'descripcion': proyectoEditado.descripcion }
      }
      return proyecto
    }))
  }


  const submitProyecto = async proyecto => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND}/api/proyectos`, proyecto, config)
      setproyectos([...proyectos, data])

      setalerta({
        msg: 'Proyecto Creado Correctamente',
        error: false
      })
      setTimeout(() => {
        navigate('/proyectos')
        setalerta()
      }, 1500);
    } catch (error) {
      console.log(error)
    }
  }

  const obtenerProyecto = async (id) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND}/api/proyectos/${id}`, config)
      setproyecto(data.proyecto)
      setalerta()
    } catch (error) {
      setalerta({
        msg: error.response.data.msg,
        error: true
      })
      navigate('/proyectos')
      setTimeout(() => {
        setalerta()
      }, 1500);
    }
  }


  const eliminarProyecto = id => {
    const token = localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
    axios.delete(`${import.meta.env.VITE_BACKEND}/api/proyectos/${id}`, config)
      .then(res => {
        setalerta(({
          msg: res.data.msg,
          error: false
        }))
        console.log(id)
        setproyectos(proyectos.filter(proyecto => proyecto._id !== id))
      })
      .catch(err => console.log(err))
    setTimeout(() => {
      setalerta()
      navigate('/proyectos')
    }, 1500);
  }

  const submitTarea = async tarea => {
    if (tarea.Id) {
      editarTarea(tarea)
      return
    }

    await crearTarea(tarea)
    return

  }

  const crearTarea = async tarea => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND}/api/tareas`, tarea, config)
      socket.emit('nueva tarea', data)

    } catch (error) {
      console.log(error)
    }

  }


  const editarTarea = async tarea => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await axios.patch(`${import.meta.env.VITE_BACKEND}/api/tareas/${tarea.Id}`, tarea, config)
      setalerta()
      console.log(data)
      socket.emit('editar tarea', data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleModalEditarTarea = tarea => {
    settarea(tarea)
    setIsOpen(true)
  }

  const handleModalEliminarTarea = tarea => {
    settarea(tarea)
    setmodalEliminarTarea(!modalEliminarTarea)
  }
  const eliminarTarea = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND}/api/tareas/${tarea._id}`, config)
      setalerta({
        msg: data.msg,
        error: false
      })
      setTimeout(() => {
        setalerta()
      }, 1500);
      setmodalEliminarTarea(false)
      settarea({})
      socket.emit('eliminar tarea', tarea)

    } catch (error) {
      console.log(error)
    }
  }

  const submitColaborador = async email => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND}/api/proyectos/colaboradores`, { email }, config)
      setcolaborador(data)
      setalerta()

    } catch (error) {
      setalerta({
        msg: error.response.data.msg,
        error: true
      })
      setTimeout(() => {
        setalerta()
      }, 1500);
    }
  }

  const agregarColaborador = async email => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND}/api/proyectos/colaboradores/${proyecto._id}`, email, config)
      setalerta({
        msg: data.msg,
        error: false
      })
      setcolaborador({})
      setTimeout(() => {
        setalerta()
      }, 1500);
    } catch (error) {
      setalerta({
        msg: error.response.data.msg,
        error: true
      })
      setTimeout(() => {
        setalerta()
      }, 1500);
    }

  }

  const handleModalEliminarColaborador = (colaborador) => {
    setmodalEliminarColaborador(!modalEliminarColaborador)
    setcolaborador(colaborador)
  }
  const eliminarColaborador = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND}/api/proyectos/eliminar-colaborador/${proyecto._id}`, { id: colaborador._id }, config)

      const proyectoActualizado = { ...proyecto }
      proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id)
      setproyecto(proyectoActualizado)
      setalerta({
        msg: data.msg,
        error: false
      })
      setcolaborador({})
      setmodalEliminarColaborador(false)
      setTimeout(() => {
        setalerta()
      }, 1500);

    } catch (error) {
      console.log(error.response)
    }
  }


  const completarTarea = async id => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND}/api/tareas/estado/${id}`, {}, config)
      socket.emit('estado tarea', data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleBuscador = () => {
    setbuscador(!buscador)
  }

  const SubmitTareasProyecto = (tarea) => {
    setproyecto({ ...proyecto, tareas: [...proyecto.tareas, tarea] })
  }
  const eliminarTareaProyecto = tarea => {
    setproyecto({
      ...proyecto, tareas: proyecto.tareas.filter(tareaState => tareaState._id !== tarea._id)
    })
  }

  const actualizarTareProyecto = tarea => {
    setproyecto({
      ...proyecto, tareas: proyecto.tareas.map(tareaState => {
        if (tareaState._id == tarea._id) {
          return tarea
        }
        return tareaState
      })
    })
  }

  const actualizarEstadoTarea = tarea => {
    setproyecto({
      ...proyecto, tareas: proyecto.tareas.map(tareaState => {
        if (tareaState._id.toString() == tarea._id) {
          return { ...tarea, 'estado': tarea.estado }
        }
        return tareaState
      })
    })
  }

  const cerrarSesionProyecto = () => {
    setproyectos({})
    setproyecto({})
    setalerta({})
  }
  return (
    <proyectoContext.Provider value={{
      proyectos,
      mostrarAlerta,
      alerta,
      submitProyecto,
      obtenerProyecto,
      proyecto,
      submitProyectoEditado,
      eliminarProyecto,
      isOpen,
      setIsOpen,
      submitTarea,
      handleModalEditarTarea,
      tarea,
      settarea,
      handleModalEliminarTarea,
      modalEliminarTarea,
      eliminarTarea,
      submitColaborador,
      colaborador,
      agregarColaborador,
      modalEliminarColaborador,
      handleModalEliminarColaborador,
      eliminarColaborador,
      completarTarea,
      buscador,
      handleBuscador,
      SubmitTareasProyecto,
      eliminarTareaProyecto,
      actualizarTareProyecto,
      actualizarEstadoTarea,
      cerrarSesionProyecto
    }}>
      {children}
    </proyectoContext.Provider>
  )
}

export default ProyectoProvider
