import formatearFecha from "../../helpers/FormatearFecha"
import useAdmin from "../../hook/useAdmin"
import useProyecto from "../../hook/useProyecto"


const Tarea = ({ tarea }) => {

  const admin = useAdmin()
  const { completarTarea, handleModalEditarTarea, handleModalEliminarTarea } = useProyecto()
  const { descripcion, nombre, prioridad, estado, fechaEntrega, _id } = tarea
  return (
    <div className="border-b p-5 flex gap-3 justify-between flex-wrap items-center">

      <div className="mx-auto flex flex-col text-center">
        <p className="mb-1 text-center text-xl">{nombre}</p>
        <p className="mb-1 text-center text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-center text-xl">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-1 text-center text-xl text-gray-600">Prioridad: {prioridad}</p>
        {estado && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">Completada por: {tarea?.completado?.nombre} </p>}
      </div>
      <div className="flex gap-2 flex-wrap mx-auto">
        {admin && <button
          onClick={() => handleModalEditarTarea(tarea)}
          className="bg-indigo-600 px-4 mx-auto py-3 text-white uppercase font-bold text-sm rounded-lg">
          Editar
        </button>}
        {estado ? (
          <button
            onClick={() => completarTarea(_id)}
            className="bg-green-600 mx-auto px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Completa
          </button>
        ) : (
          <button
            onClick={() => completarTarea(_id)}
            className="bg-gray-600 mx-auto px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Incompleta
          </button>
        )}
        {admin && <button
          onClick={() => handleModalEliminarTarea(tarea)}
          className="bg-red-600 px-4 py-3 mx-auto text-white uppercase font-bold text-sm rounded-lg">
          Eliminar
        </button>}
      </div>
    </div>
  )
}

export default Tarea
